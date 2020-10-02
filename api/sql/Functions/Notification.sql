CREATE OR REPLACE FUNCTION notification_updates()
RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify(
    'accounts_changed',
    json_build_object(
      'operation', TG_OP,
      'record', row_to_json(NEW)
    )::text
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;