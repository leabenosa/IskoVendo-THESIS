import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ocxlklwsovcojqexhpnm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jeGxrbHdzb3Zjb2pxZXhocG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTkyOTEsImV4cCI6MjA4MDkzNTI5MX0.cCUseLQCJbp1X2vF69ZpTvnn3oi9R9Yjfobap3Q_Ds0'; // Replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
