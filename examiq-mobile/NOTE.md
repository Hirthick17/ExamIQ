# Environment Configuration Setup

⚠️ **IMPORTANT**: Follow these steps to configure your environment:

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your actual Supabase credentials:**
   - Open `.env` file
   - Replace `your_supabase_project_url` with your actual Supabase project URL
   - Replace `your_supabase_anon_key` with your actual Supabase anonymous key
   - Update `API_BASE_URL` if your backend is running on a different port

3. **Verify your Supabase credentials:**
   - Log in to your Supabase dashboard
   - Go to Project Settings > API
   - Copy the Project URL and anon/public key

4. **Restart your development server** after updating the `.env` file:
   ```bash
   npm start
   ```

