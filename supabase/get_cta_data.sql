-- Rodar no SQL Editor do Supabase:
-- https://supabase.com/dashboard/project/ncbjtvooshdcupfbhycn/sql

CREATE OR REPLACE FUNCTION public.get_cta_data(
  p_start date DEFAULT NULL,
  p_end   date DEFAULT NULL
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
WITH
  -- ── Leads Consultoria ──────────────────────────────────────────
  lc AS (
    SELECT *
    FROM typeform_leads_auvpcapital
    WHERE (p_start IS NULL OR created_at::date >= p_start)
      AND (p_end   IS NULL OR created_at::date <= p_end)
  ),
  lc_patrimonio AS (
    SELECT
      heritage        AS label,
      COUNT(*)::int   AS value
    FROM lc
    WHERE heritage IS NOT NULL AND heritage <> ''
    GROUP BY heritage
    ORDER BY value DESC
  ),
  lc_mensal AS (
    SELECT
      to_char(date_trunc('month', created_at), 'Mon/YY')  AS mes,
      date_trunc('month', created_at)                      AS ordem,
      COUNT(*)::int                                         AS value
    FROM lc
    GROUP BY 1, 2
    ORDER BY 2
  ),
  -- ── Leads Analítica ────────────────────────────────────────────
  la AS (
    SELECT *
    FROM log_analitica
    WHERE (p_start IS NULL OR created_at::date >= p_start)
      AND (p_end   IS NULL OR created_at::date <= p_end)
  ),
  la_modulo AS (
    SELECT
      utm_campaign    AS label,
      COUNT(*)::int   AS value
    FROM la
    WHERE utm_campaign IS NOT NULL AND utm_campaign <> ''
    GROUP BY utm_campaign
    ORDER BY value DESC
  ),
  la_mensal AS (
    SELECT
      to_char(date_trunc('month', created_at), 'Mon/YY')  AS mes,
      date_trunc('month', created_at)                      AS ordem,
      COUNT(*)::int                                         AS value
    FROM la
    GROUP BY 1, 2
    ORDER BY 2
  ),
  la_oferta AS (
    SELECT
      offer_name      AS nome,
      COUNT(*)::int   AS qtd
    FROM la
    WHERE offer_name IS NOT NULL AND offer_name <> ''
    GROUP BY offer_name
    ORDER BY qtd DESC
  )
SELECT jsonb_build_object(
  'leads_consultoria', jsonb_build_object(
    'total',          (SELECT COUNT(*)::int FROM lc),
    'por_patrimonio', COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM lc_patrimonio t), '[]'::jsonb),
    'por_mes',        COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM lc_mensal    t), '[]'::jsonb)
  ),
  'leads_analitica', jsonb_build_object(
    'total',       (SELECT COUNT(*)::int FROM la),
    'por_modulo',  COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM la_modulo t), '[]'::jsonb),
    'por_mes',     COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM la_mensal t), '[]'::jsonb),
    'por_oferta',  COALESCE((SELECT jsonb_agg(to_jsonb(t)) FROM la_oferta t), '[]'::jsonb)
  )
);
$$;

-- Garante permissão para a nova assinatura
GRANT EXECUTE ON FUNCTION public.get_cta_data(date, date) TO anon;
GRANT EXECUTE ON FUNCTION public.get_cta_data(date, date) TO authenticated;
