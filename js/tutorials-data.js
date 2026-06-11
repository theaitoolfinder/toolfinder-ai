/* ============================================================
   TUTORIALS DATA  —  Single source of truth
   Each key = tool slug (must match cardHTML slug in index.html)
   Levels: basic (free) | intermediate (subscribe) | advanced (subscribe + tried tool)
   ============================================================ */
window.TUTORIALS_DATA = {

  /* ── ElevenLabs ── */
  'elevenlabs': {
    name: 'ElevenLabs',
    domain: 'elevenlabs.io',
    affiliate_url: 'https://try.elevenlabs.io/flxscqgtf1ys',
    category: 'Audio',
    tagline: 'AI Voice Generation & Cloning',
    color: '#5856d6',
    levels: {
      basic: {
        title: 'Your First AI Voice with ElevenLabs',
        description: 'Generate a professional voiceover in under 5 minutes — no mic needed.',
        duration: '5 min',
        steps: [
          {
            title: 'Sign up for a free account',
            content: `<p>Go to <strong>elevenlabs.io</strong> and click <em>Sign Up Free</em>. The free tier gives you 10,000 characters/month — enough to test dozens of voiceovers.</p>
<p>Once logged in, you land on the <strong>Speech Synthesis</strong> dashboard. This is where all voice magic happens.</p>`,
            tip: { type: 'info', text: 'No credit card required for the free tier. Start creating immediately.' }
          },
          {
            title: 'Choose a pre-built voice',
            content: `<p>In the <strong>Voice</strong> dropdown on the left, scroll through the library. ElevenLabs ships with 30+ professional voices — try <em>Rachel</em> (warm, conversational) or <em>Adam</em> (deep, authoritative).</p>
<p>Click the <strong>▶ Play</strong> icon next to any voice to preview it before committing.</p>`,
            tip: { type: 'tip', text: 'Sort voices by "Use case" to quickly find the right fit — Narration, News, Social Media, etc.' }
          },
          {
            title: 'Type or paste your script',
            content: `<p>In the large text box, paste your script. Keep it under <strong>2,500 characters</strong> on the free plan per generation.</p>
<p>Example script to try:</p>
<div class="code-box"><em>"Welcome to MyAI ToolsFinder — your shortcut to the best AI tools on the planet. Let's explore what AI can do for you today."</em></div>`,
            tip: null
          },
          {
            title: 'Adjust Stability & Clarity',
            content: `<p>Two sliders control how the voice sounds:</p>
<ul>
  <li><strong>Stability</strong> — higher = more consistent tone; lower = more expressive/varied</li>
  <li><strong>Clarity + Similarity</strong> — higher = crisper, closer to the original voice</li>
</ul>
<p>For narration, start at <strong>Stability 60, Clarity 75</strong>. For conversational content, drop Stability to 40.</p>`,
            tip: { type: 'tip', text: 'Small changes matter. Move sliders in 10-point increments and re-generate to hear the difference.' }
          },
          {
            title: 'Generate & Download',
            content: `<p>Click the orange <strong>Generate</strong> button. In 5–15 seconds you'll hear your audio play automatically.</p>
<p>Click the <strong>Download</strong> icon (↓) to save the MP3. Your audio history is stored in the <em>History</em> tab on the left.</p>`,
            tip: { type: 'success', text: 'You just created a professional voiceover without a recording studio. Share it, embed it, publish it.' }
          }
        ]
      },
      intermediate: {
        title: 'Clone Your Own Voice',
        description: 'Upload 1 minute of audio and ElevenLabs will clone your voice permanently.',
        duration: '15 min',
        steps: [
          {
            title: 'Record a clean 1-minute sample',
            content: `<p>Quality in = quality out. Record yourself reading a neutral script in a quiet room. Use your phone's default voice memo app — it's fine.</p>
<p>Avoid: background music, echo, Zoom compression, or edited clips. Raw recordings work best.</p>`,
            tip: { type: 'warning', text: 'ElevenLabs requires you to confirm the voice is yours. Cloning another person\'s voice without consent violates their Terms of Service.' }
          },
          {
            title: 'Create an Instant Voice Clone',
            content: `<p>In the sidebar, click <strong>Voices → Add Voice → Instant Voice Clone</strong>. Upload your recording (MP3, WAV, or M4A accepted).</p>
<p>Name your voice (e.g. "My Voice — Studio") and add a description. Click <strong>Add Voice</strong>.</p>`,
            tip: { type: 'info', text: 'Instant clones are available on all paid plans. Professional Voice Clone (higher accuracy) requires the Creator plan or above.' }
          },
          {
            title: 'Test the clone with a script',
            content: `<p>Switch the voice selector to your new cloned voice. Type a fresh sentence — something you did <em>not</em> record — and generate it.</p>
<p>You'll hear your own voice reading brand new text. Tweak Stability/Clarity until it matches how you actually sound in conversation.</p>`,
            tip: null
          },
          {
            title: 'Use voice in long-form content',
            content: `<p>ElevenLabs splits long scripts automatically. Paste a full blog post (up to 5,000 chars on paid plans) and it generates a seamless narration in your voice.</p>
<p>Use cases: podcast intros, YouTube narration, course content, audiobooks, or branded social clips.</p>`,
            tip: { type: 'tip', text: 'Pro tip: use the same cloned voice across all your content. Audiences start recognizing your "audio brand."' }
          }
        ]
      },
      advanced: {
        title: 'Build a Text-to-Speech Pipeline with the API',
        description: 'Automate voiceover generation at scale — connect ElevenLabs to your content workflow.',
        duration: '30 min',
        steps: [
          {
            title: 'Get your API key',
            content: `<p>In ElevenLabs, go to <strong>Profile → API Key</strong>. Copy the key — you'll use it in every API request.</p>
<p>Base URL: <code>https://api.elevenlabs.io/v1/</code></p>`,
            tip: { type: 'warning', text: 'Keep your API key private. Never expose it in public GitHub repos or client-side JS.' }
          },
          {
            title: 'Make your first API call',
            content: `<p>Use this cURL command to generate audio from text:</p>
<div class="code-box">curl -X POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id} \\<br>&nbsp;&nbsp;-H "xi-api-key: YOUR_KEY" \\<br>&nbsp;&nbsp;-H "Content-Type: application/json" \\<br>&nbsp;&nbsp;-d '{"text": "Hello world", "model_id": "eleven_monolingual_v1"}' \\<br>&nbsp;&nbsp;--output audio.mp3</div>
<p>Replace <code>{voice_id}</code> with your cloned voice ID (found in Voices settings).</p>`,
            tip: null
          },
          {
            title: 'Automate with Make.com or n8n',
            content: `<p>Connect ElevenLabs to your publishing workflow:</p>
<ol>
  <li>Trigger: New blog post published (RSS or Webhook)</li>
  <li>Action: Send post body to ElevenLabs API → receive MP3</li>
  <li>Action: Upload MP3 to S3 / Cloudflare R2</li>
  <li>Action: Embed audio player URL back into your CMS</li>
</ol>
<p>Result: every article automatically gets a listen version in your own voice.</p>`,
            tip: { type: 'tip', text: 'Use Make.com (also an affiliate tool on this site!) to wire this up with zero code.' }
          },
          {
            title: 'Batch generate for content libraries',
            content: `<p>Write a simple Python script to loop through a CSV of scripts and generate each as an MP3:</p>
<div class="code-box">import requests, csv<br>for row in csv.reader(open('scripts.csv')):<br>&nbsp;&nbsp;r = requests.post(url, headers=headers, json={"text": row[0]})<br>&nbsp;&nbsp;open(f"{row[1]}.mp3","wb").write(r.content)</div>
<p>This lets you produce 100 voiceovers in minutes — perfect for courses, ad variations, or localized content.</p>`,
            tip: { type: 'success', text: 'Agencies use this exact workflow to deliver branded audio at scale for clients.' }
          }
        ]
      }
    }
  },

  /* ── NeuronWriter ── */
  'neuronwriter': {
    name: 'NeuronWriter',
    domain: 'neuronwriter.com',
    affiliate_url: 'https://app.neuronwriter.com/ar/a164b2cc978873dc1a98713284d9b87a',
    category: 'SEO',
    tagline: 'AI-Powered SEO Content Optimization',
    color: '#0ea5e9',
    levels: {
      basic: {
        title: 'Write SEO Content That Actually Ranks',
        description: 'Use NeuronWriter to optimize your first article for Google in 10 minutes.',
        duration: '10 min',
        steps: [
          {
            title: 'Create a new project',
            content: `<p>Log into NeuronWriter and click <strong>New Project</strong>. Enter your domain name and pick the language and target country.</p>
<p>Projects keep your content organized by website — create one per domain you manage.</p>`,
            tip: { type: 'info', text: 'NeuronWriter pulls real Google SERP data, so choosing the right country matters for accurate competition analysis.' }
          },
          {
            title: 'Start a new content query',
            content: `<p>Inside your project, click <strong>New Query</strong>. Enter your target keyword (e.g. "best AI tools for content creation") and hit <strong>Analyze</strong>.</p>
<p>NeuronWriter will fetch the top 30 Google results for that keyword and extract what makes them rank.</p>`,
            tip: { type: 'tip', text: 'Use exact phrases people search for, not vague topic words. "AI content tools" ranks differently than "AI tools for content creation."' }
          },
          {
            title: 'Read the Content Score target',
            content: `<p>On the right sidebar you'll see a <strong>Content Score</strong> gauge showing the average score of top-ranking pages (usually 50–70).</p>
<p>Your job: hit that score or beat it. The editor highlights missing terms in real time as you write.</p>`,
            tip: null
          },
          {
            title: 'Use recommended NLP terms',
            content: `<p>Scroll the right panel to find <strong>Recommended Terms</strong> — semantically related phrases Google expects to see in your content.</p>
<p>Green = used enough. Orange = use more. Red = missing entirely. Weave these naturally into your writing.</p>`,
            tip: { type: 'warning', text: 'Don\'t stuff keywords. Use them naturally in context — Google\'s NLP can tell the difference.' }
          },
          {
            title: 'Check competitor word counts & headings',
            content: `<p>Click the <strong>SERP Analysis</strong> tab to see what all top-10 competitors are writing about. Note their average word count, H2 structure, and questions they answer.</p>
<p>Match the depth, then add something unique. That's the formula.</p>`,
            tip: { type: 'success', text: 'Articles that match competitor depth + add unique value consistently outperform pure keyword-stuffed content.' }
          }
        ]
      },
      intermediate: {
        title: 'AI Draft Generation & Outline Structuring',
        description: 'Let NeuronWriter\'s AI write a full SEO-optimized draft for you.',
        duration: '20 min',
        steps: [
          {
            title: 'Generate an AI outline',
            content: `<p>With your query open, click <strong>AI Writer → Generate Outline</strong>. NeuronWriter creates H2/H3 structure based on what top pages use — not random guesses.</p>
<p>Reorder, add, or remove sections to match your angle.</p>`,
            tip: { type: 'tip', text: 'The best outlines mix competitor H2s with questions from Google\'s "People Also Ask" box.' }
          },
          {
            title: 'Generate section-by-section content',
            content: `<p>Click inside any section heading and use <strong>AI → Write for this section</strong>. NeuronWriter generates 150–300 words tuned to your target terms.</p>
<p>Repeat for each section. Edit tone, add examples, insert your own insights.</p>`,
            tip: null
          },
          {
            title: 'Optimize internal links',
            content: `<p>In the <strong>Internal Links</strong> tab, NeuronWriter shows pages on your site that should link to — or receive links from — this article.</p>
<p>Add 2–4 internal links. This passes authority and helps Google understand your site structure.</p>`,
            tip: { type: 'info', text: 'Internal linking is one of the most overlooked on-page SEO tactics. Don\'t skip this step.' }
          },
          {
            title: 'Publish and track position',
            content: `<p>Export your content as HTML or paste directly into WordPress/Webflow. NeuronWriter integrates with WordPress via plugin for one-click publishing.</p>
<p>After publishing, use the <strong>SERP Tracker</strong> to monitor keyword position weekly.</p>`,
            tip: { type: 'success', text: 'Most articles need 6–12 weeks to rank. Track position and refresh content if it stalls at positions 11–20.' }
          }
        ]
      },
      advanced: {
        title: 'Content Cluster Strategy at Scale',
        description: 'Build topical authority by planning and executing full content clusters in NeuronWriter.',
        duration: '45 min',
        steps: [
          {
            title: 'Map a topical cluster',
            content: `<p>A content cluster = 1 pillar page + 8–15 supporting articles all linking to each other. This signals deep topical expertise to Google.</p>
<p>In NeuronWriter, create a folder for your cluster topic. Add one query per article you plan to write.</p>`,
            tip: { type: 'tip', text: 'Clusters beat individual posts every time. A site with 10 inter-linked articles on "AI voiceover" will outrank a site with one 5,000-word guide.' }
          },
          {
            title: 'Identify keyword gaps with SERP analysis',
            content: `<p>Run your pillar keyword through the SERP analyzer. In <strong>Competitor Content</strong>, check which supporting topics competitors cover that you don't yet.</p>
<p>Each gap = one more article to add to your cluster plan.</p>`,
            tip: null
          },
          {
            title: 'Use the Content Planner for bulk queries',
            content: `<p>Upload a CSV of 50+ keywords to NeuronWriter's <strong>Content Planner</strong>. It groups them by semantic similarity and scores each by difficulty and traffic potential.</p>
<p>Prioritize low-difficulty, high-intent terms first to build early momentum.</p>`,
            tip: { type: 'info', text: 'Content Planner is available on the Business plan and above.' }
          },
          {
            title: 'Refresh old content systematically',
            content: `<p>Re-run SERP analysis on articles 6+ months old. If your content score dropped below the average (competitors updated their pages), regenerate sections using AI and re-publish.</p>
<p>Refreshed content gets a "freshness boost" that can push positions 5–10 spots.</p>`,
            tip: { type: 'success', text: 'Refreshing 10 old articles takes less time than writing 2 new ones — and can deliver 3x the traffic gains.' }
          }
        ]
      }
    }
  },

  /* ── Fireflies.ai ── */
  'fireflies-ai': {
    name: 'Fireflies.ai',
    domain: 'fireflies.ai',
    affiliate_url: 'https://fireflies.ai/?fpr=benjie21',
    category: 'Productivity',
    tagline: 'AI Meeting Transcription & Notes',
    color: '#7c3aed',
    levels: {
      basic: {
        title: 'Never Take Meeting Notes Again',
        description: 'Set up Fireflies to auto-join, record, and transcribe your meetings.',
        duration: '5 min',
        steps: [
          {
            title: 'Connect your calendar',
            content: `<p>After signing up, click <strong>Integrations → Google Calendar</strong> (or Outlook). Grant permission. Fireflies will now see all your upcoming meetings.</p>
<p>The AI note-taker bot (Fred) will auto-join any meeting with a video link in the invite.</p>`,
            tip: { type: 'info', text: 'Fireflies works with Zoom, Google Meet, Microsoft Teams, Webex, and more — out of the box.' }
          },
          {
            title: 'Invite Fred to a meeting',
            content: `<p>For meetings not in your calendar, copy the meeting link and go to <strong>Add to Meeting</strong> in the Fireflies dashboard. Paste the link and Fred will join.</p>
<p>You'll see Fred appear as a participant — it's just the AI bot, it doesn't speak.</p>`,
            tip: { type: 'tip', text: 'Always give attendees a heads-up that the meeting is being recorded. It\'s both polite and legally required in many regions.' }
          },
          {
            title: 'Review your transcript',
            content: `<p>Within minutes of the meeting ending, Fireflies sends you an email with the full transcript and AI summary.</p>
<p>In the dashboard under <strong>Meetings</strong>, open any session to see: full transcript, speaker identification, timestamps, and a searchable text view.</p>`,
            tip: null
          },
          {
            title: 'Search across all meetings',
            content: `<p>Use the <strong>Search</strong> bar to find any word spoken across all your recorded meetings. Type "pricing" and every meeting where pricing was discussed appears instantly.</p>
<p>This turns your meeting history into a searchable knowledge base.</p>`,
            tip: { type: 'success', text: '"Did we discuss that in the Tuesday call?" — never ask that question again.' }
          }
        ]
      },
      intermediate: {
        title: 'AI Summaries, Action Items & CRM Sync',
        description: 'Extract decisions and push them directly to your CRM or project tool.',
        duration: '15 min',
        steps: [
          {
            title: 'Customize your AI summary format',
            content: `<p>Go to <strong>Settings → Notebook</strong>. Choose which AI sections appear in every summary: Overview, Action Items, Decisions, Questions, Topics.</p>
<p>For sales calls, enable <strong>SPIN</strong> or <strong>BANT</strong> frameworks to auto-extract sales intelligence.</p>`,
            tip: { type: 'tip', text: 'Custom templates save 10+ minutes of manual note cleanup after every single meeting.' }
          },
          {
            title: 'Extract and assign action items',
            content: `<p>In the AI Summary tab, click <strong>Action Items</strong>. Fireflies extracts every commitment made in the meeting (e.g. "John will send the proposal by Friday").</p>
<p>Click any action item to assign it, add a due date, and push it to a connected project tool.</p>`,
            tip: null
          },
          {
            title: 'Connect to HubSpot or Salesforce',
            content: `<p>Under <strong>Integrations</strong>, connect your CRM. After each sales call, Fireflies auto-logs:</p>
<ul>
  <li>Full transcript as a note</li>
  <li>AI summary on the contact/deal record</li>
  <li>Action items as tasks</li>
</ul>
<p>Zero manual data entry after calls — ever.</p>`,
            tip: { type: 'info', text: 'CRM sync is available on the Business plan. It pays for itself after the first 5 hours of manual logging you skip.' }
          },
          {
            title: 'Share meeting highlights',
            content: `<p>Use <strong>Soundbites</strong> to clip key moments from the transcript. Share a 30-second audio clip of a client testimonial or product demo highlight — directly from the recording.</p>
<p>Great for sales teams sharing winning call moments or onboarding new reps.</p>`,
            tip: { type: 'success', text: 'Sales managers: share top performer call clips as training material. No extra recording setup needed.' }
          }
        ]
      },
      advanced: {
        title: 'Build a Meeting Intelligence System',
        description: 'Use Fireflies API + webhooks to automate your entire post-meeting workflow.',
        duration: '40 min',
        steps: [
          {
            title: 'Set up Fireflies webhooks',
            content: `<p>In <strong>Settings → Webhooks</strong>, add a webhook URL. Fireflies will POST to it whenever a meeting transcript is ready.</p>
<p>Payload includes: transcript text, speaker data, summary, action items, and meeting metadata.</p>`,
            tip: { type: 'info', text: 'Use a service like Make.com or n8n to receive webhooks without writing server code.' }
          },
          {
            title: 'Auto-generate follow-up emails',
            content: `<p>Wire: Fireflies webhook → Make.com → ChatGPT API → Gmail drafts</p>
<p>Every meeting automatically creates a personalized follow-up email draft in your Gmail, pre-filled with action items and next steps from the AI summary. Review and send in 30 seconds.</p>`,
            tip: { type: 'tip', text: 'Clients are consistently impressed by fast, detailed follow-ups. This automation gives you that edge at zero effort.' }
          },
          {
            title: 'Build a team knowledge base',
            content: `<p>Route all meeting transcripts to a Notion database or Confluence space via webhook → Make.com. Tag each by meeting type (client/internal/sales) and project.</p>
<p>Your team now has a fully searchable archive of every conversation, decision, and commitment — organized automatically.</p>`,
            tip: null
          },
          {
            title: 'Analytics: track meeting efficiency',
            content: `<p>Use Fireflies' <strong>Analytics</strong> dashboard to see: talk-to-listen ratio per person, average meeting length by type, most active meeting hours, and filler word frequency.</p>
<p>Use this data in 1:1s to coach reps on call quality — backed by data, not gut feel.</p>`,
            tip: { type: 'success', text: 'Teams that review call analytics improve close rates by coaching on specific moments — not vague "be more confident" feedback.' }
          }
        ]
      }
    }
  },

  /* ── Reclaim AI ── */
  'reclaim-ai': {
    name: 'Reclaim AI',
    domain: 'reclaim.ai',
    affiliate_url: 'https://go.reclaim.ai/do7hs1jez62m',
    category: 'Productivity',
    tagline: 'AI Calendar & Time Management',
    color: '#059669',
    levels: {
      basic: {
        title: 'Let AI Manage Your Calendar',
        description: 'Set up Reclaim to automatically protect focus time and schedule tasks.',
        duration: '8 min',
        steps: [
          {
            title: 'Connect Google Calendar',
            content: `<p>Sign up and connect your Google Calendar. Reclaim reads your existing events to understand when you're busy and finds open slots for what matters.</p>
<p>If you have a work and personal calendar, connect both — Reclaim will respect your working hours.</p>`,
            tip: { type: 'info', text: 'Reclaim currently integrates with Google Calendar. Outlook support is in beta.' }
          },
          {
            title: 'Create your first Task',
            content: `<p>Go to <strong>Tasks</strong> and click <strong>New Task</strong>. Enter: task name, estimated duration, due date, and priority.</p>
<p>Example: "Write newsletter" — 2 hours — due Friday — High priority.</p>
<p>Reclaim will automatically find the best open slot before Friday and block it in your calendar.</p>`,
            tip: { type: 'tip', text: 'Be realistic with time estimates. Most people underestimate by 30%. Add a buffer.' }
          },
          {
            title: 'Set up Habits (focus blocks)',
            content: `<p>Under <strong>Habits</strong>, create recurring time blocks: deep work, email inbox, lunch, gym, learning time.</p>
<p>Reclaim defends these slots from meeting requests — it reschedules them if a meeting lands on one, rather than losing them entirely.</p>`,
            tip: null
          },
          {
            title: 'Enable Smart 1:1s',
            content: `<p>For recurring 1:1 meetings, use <strong>Smart 1:1s</strong> — Reclaim finds a mutual open slot for you and a colleague automatically. No back-and-forth scheduling.</p>
<p>Share your Scheduling Link so others can book time without seeing your full calendar.</p>`,
            tip: { type: 'success', text: 'The average knowledge worker spends 4.8 hours/week on scheduling. Reclaim gets most of that back.' }
          }
        ]
      },
      intermediate: {
        title: 'Team Scheduling & Workload Balancing',
        description: 'Sync Reclaim across your team to eliminate meeting chaos.',
        duration: '20 min',
        steps: [
          {
            title: 'Invite team members',
            content: `<p>In <strong>Team Settings</strong>, invite colleagues. Once connected, Reclaim can see team availability without sharing individual calendar details.</p>
<p>Great for distributed teams across timezones — Reclaim surfaces optimal overlap windows.</p>`,
            tip: { type: 'tip', text: 'Works best when the whole team is on Reclaim. Push for it as a team tool, not just personal use.' }
          },
          {
            title: 'Set up Task sync with Asana/Linear/Jira',
            content: `<p>Under <strong>Integrations</strong>, connect your project management tool. Reclaim imports tasks and automatically schedules work time for them on your calendar.</p>
<p>When a task's due date changes in Jira, Reclaim re-schedules the calendar block automatically.</p>`,
            tip: null
          },
          {
            title: 'Buffer time between meetings',
            content: `<p>In <strong>Scheduling Settings</strong>, configure meeting buffers: 5–15 min before/after each meeting. Reclaim blocks these automatically so you have time to prepare and decompress.</p>
<p>Also set your <strong>Meeting Hours</strong> — a window of hours when meetings are allowed. Protect mornings for deep work.</p>`,
            tip: { type: 'info', text: 'Most people have meeting-free mornings as their single biggest productivity gain. Guard them fiercely.' }
          },
          {
            title: 'Review the Planner view',
            content: `<p>The <strong>Planner</strong> shows your week as a prioritized task list + visual calendar side-by-side. Drag tasks to reschedule manually when needed.</p>
<p>Use it every Monday morning for a 5-minute weekly review — adjust priorities before the week runs away.</p>`,
            tip: { type: 'success', text: 'Leaders who do a 5-minute Monday planner check-in consistently report less stress and better output by Friday.' }
          }
        ]
      },
      advanced: {
        title: 'Full Workflow Automation with Reclaim API',
        description: 'Automate time-blocking and task creation from external triggers.',
        duration: '35 min',
        steps: [
          {
            title: 'Get your Reclaim API key',
            content: `<p>In <strong>Settings → API</strong>, generate a personal API key. Reclaim's REST API lets you programmatically create tasks, habits, and scheduling links.</p>`,
            tip: { type: 'warning', text: 'The Reclaim API is available on Team and Enterprise plans.' }
          },
          {
            title: 'Auto-create tasks from email',
            content: `<p>Workflow: Gmail label "Action Needed" → Make.com → Reclaim API (POST /tasks)</p>
<p>Every email you label automatically becomes a scheduled calendar task. No manual entry, no dropped balls.</p>`,
            tip: { type: 'tip', text: 'Combine with Fireflies — action items from meeting transcripts auto-become Reclaim tasks with deadlines.' }
          },
          {
            title: 'Build a personal OKR time tracker',
            content: `<p>Create Reclaim Habits tied to each of your quarterly goals (OKRs). Track how many hours per week actually go to each goal via the <strong>Analytics</strong> dashboard.</p>
<p>Most people discover they spend 80% of their time on low-priority work. Seeing it quantified forces change.</p>`,
            tip: null
          },
          {
            title: 'Embed scheduling links in automations',
            content: `<p>Use the Reclaim API to generate unique scheduling links dynamically — embed them in automated outreach emails, CRM follow-ups, or post-purchase flows.</p>
<p>Example: after a lead submits a contact form, they immediately get a personalized scheduling link that shows only your available slots.</p>`,
            tip: { type: 'success', text: 'Personalized scheduling links convert 40–60% better than generic Calendly links.' }
          }
        ]
      }
    }
  },

  /* ── Beehiiv ── */
  'beehiiv': {
    name: 'Beehiiv',
    domain: 'beehiiv.com',
    affiliate_url: 'https://www.beehiiv.com/?via=benjie-gadiaza',
    category: 'Marketing',
    tagline: 'Newsletter Platform Built for Growth',
    color: '#f59e0b',
    levels: {
      basic: {
        title: 'Launch Your Newsletter in 30 Minutes',
        description: 'Set up Beehiiv, design your first issue, and send it to subscribers.',
        duration: '30 min',
        steps: [
          {
            title: 'Create your publication',
            content: `<p>Sign up and click <strong>New Publication</strong>. Enter your newsletter name, description, and choose a subdomain (e.g. yourname.beehiiv.com — you can add a custom domain later).</p>
<p>Pick your primary niche. Beehiiv uses this to match you with relevant ad partners later.</p>`,
            tip: { type: 'info', text: 'Beehiiv\'s free plan supports up to 2,500 subscribers. No credit card needed to start.' }
          },
          {
            title: 'Customize your design',
            content: `<p>In <strong>Design</strong>, choose a template and set your brand colors, logo, and font. Beehiiv newsletters look clean by default — minimal tweaking needed.</p>
<p>Preview on desktop and mobile before publishing. 60%+ of newsletter opens happen on mobile.</p>`,
            tip: { type: 'tip', text: 'Keep your design simple. The content is what keeps readers — not fancy templates.' }
          },
          {
            title: 'Write your first post',
            content: `<p>Go to <strong>Posts → New Post</strong>. Beehiiv has a Notion-like editor: type <code>/</code> to insert images, dividers, buttons, or tweet embeds.</p>
<p>Write your first issue. It doesn't need to be perfect — it needs to be sent. Start with 300–500 words.</p>`,
            tip: null
          },
          {
            title: 'Add your first subscribers',
            content: `<p>Under <strong>Audience</strong>, import existing contacts as CSV or share your subscribe page URL on social media.</p>
<p>Even 10 subscribers is a real audience. Send to them, get feedback, improve.</p>`,
            tip: { type: 'success', text: 'The best time to start was yesterday. The second best time is today. Send your first issue to even 5 people.' }
          }
        ]
      },
      intermediate: {
        title: 'Grow Your List with Referrals & SEO',
        description: 'Use Beehiiv\'s built-in growth tools to compound your subscriber count.',
        duration: '25 min',
        steps: [
          {
            title: 'Activate the Referral Program',
            content: `<p>In <strong>Grow → Referral Program</strong>, set up milestone rewards (e.g. 5 referrals = free ebook, 25 = 1:1 call). Beehiiv tracks referral links automatically per subscriber.</p>
<p>Embed the referral CTA in every issue footer with one click.</p>`,
            tip: { type: 'tip', text: 'Referral programs consistently drive 20–30% of top newsletter growth. It\'s the highest-ROI growth channel after word of mouth.' }
          },
          {
            title: 'Enable Web Archive & SEO',
            content: `<p>Every Beehiiv post has a public web URL. In <strong>Settings → SEO</strong>, add meta descriptions and OG images to each post so they rank in Google.</p>
<p>Old newsletters become evergreen SEO content — a double use of every issue you write.</p>`,
            tip: null
          },
          {
            title: 'Set up a Welcome Email Sequence',
            content: `<p>Under <strong>Automations</strong>, create a 3-email welcome series triggered when someone subscribes:</p>
<ol><li>Email 1: Welcome + best past issue</li><li>Email 3: Your story + what to expect</li><li>Email 7: Your most valuable resource</li></ol>`,
            tip: { type: 'info', text: 'Welcome sequences have 5x higher open rates than regular sends. New subscribers are at peak engagement — use it.' }
          },
          {
            title: 'Boost with Recommendations',
            content: `<p>In <strong>Grow → Recommendations</strong>, add other newsletters you trust. Beehiiv shows them to your subscribers post-sign-up, and those newsletters return the favor.</p>
<p>Cross-promotion is how newsletters grow fastest without paid ads.</p>`,
            tip: { type: 'success', text: 'Newsletter swaps with similar-sized publications can add 50–200 subscribers per activation.' }
          }
        ]
      },
      advanced: {
        title: 'Monetize with Ads, Paid Tiers & Sponsorships',
        description: 'Turn your audience into revenue using Beehiiv\'s full monetization stack.',
        duration: '40 min',
        steps: [
          {
            title: 'Join Beehiiv Ad Network',
            content: `<p>Once you hit 1,000+ subscribers, apply to the <strong>Beehiiv Ad Network</strong>. Brands pay to place ads in your newsletter — Beehiiv handles the matching, billing, and compliance.</p>
<p>CPMs range from $15–60+ depending on your niche. A 5,000-subscriber tech newsletter can earn $200–400/issue.</p>`,
            tip: { type: 'info', text: 'Ad Network is available on the Scale plan ($99/mo). The math works at ~2,000+ engaged subscribers.' }
          },
          {
            title: 'Launch a Paid Subscription tier',
            content: `<p>In <strong>Monetize → Paid Subscriptions</strong>, set a monthly or annual price. Mark individual posts as "Premium Only" to give paid subscribers exclusive content.</p>
<p>Most successful paid newsletters offer: free weekly digest + paid deep-dive or community access.</p>`,
            tip: { type: 'tip', text: 'Even 1% paid conversion matters. 10,000 subscribers × 1% × $10/mo = $1,000 MRR.' }
          },
          {
            title: 'Sell Boosts (paid recommendations)',
            content: `<p>In <strong>Grow → Boosts</strong>, set a price per subscriber acquisition (e.g. $2/subscriber). Other newsletter operators pay to be recommended to your audience after sign-up.</p>
<p>A 10,000-subscriber list can passively earn $500–2,000/month just from Boosts — while your subscribers discover great newsletters.</p>`,
            tip: null
          },
          {
            title: 'Analyze and double down',
            content: `<p>Use <strong>Analytics</strong> to find your highest-converting subject lines, best-performing issue topics, and most-clicked links. Write more of what works.</p>
<p>Track: open rate (aim 40%+), click rate (aim 5%+), unsubscribe rate (keep below 0.5%).</p>`,
            tip: { type: 'success', text: 'One insight from analytics → adjusted content strategy → compounded over 52 issues = dramatically different newsletter in a year.' }
          }
        ]
      }
    }
  },

  /* ── Make.com ── */
  'make-com': {
    name: 'Make.com',
    domain: 'make.com',
    affiliate_url: 'https://www.make.com/en/register?pc=myaitoolsfinder',
    category: 'Automation',
    tagline: 'Visual Workflow Automation',
    color: '#6366f1',
    levels: {
      basic: {
        title: 'Automate Your First Workflow',
        description: 'Build a real automation in Make.com — no code required.',
        duration: '15 min',
        steps: [
          {
            title: 'Understand scenarios',
            content: `<p>In Make.com, workflows are called <strong>Scenarios</strong>. Each scenario has a <strong>trigger</strong> (what starts it) and <strong>actions</strong> (what it does).</p>
<p>Example: "When I get a new Gmail email from a client → add it to a Google Sheet → send me a Slack notification."</p>`,
            tip: { type: 'info', text: 'Make.com has 1,500+ app integrations — if you use a tool, Make.com probably connects to it.' }
          },
          {
            title: 'Create your first scenario',
            content: `<p>Click <strong>Create a new scenario</strong>. Click the "+" to add your first module. Search for your trigger app (e.g. Gmail).</p>
<p>Authorize Make.com to connect to your app — you'll do this once per service.</p>`,
            tip: null
          },
          {
            title: 'Add a trigger module',
            content: `<p>Select the trigger event. For Gmail: <em>Watch Emails</em> → choose a label or inbox. Make.com will check for new emails on your schedule (every 15 min on free).</p>
<p>Click <strong>Run Once</strong> to test the trigger — it pulls a real email to work with.</p>`,
            tip: { type: 'tip', text: 'Always test with real data. Made-up test data hides formatting issues that real data reveals.' }
          },
          {
            title: 'Add an action and run it',
            content: `<p>Click the "+" after your trigger to add an action. Example: <em>Google Sheets → Add Row</em>. Map fields from the email (subject, sender, date) to spreadsheet columns.</p>
<p>Click <strong>Run Once</strong> again — if everything is green, activate your scenario with the toggle.</p>`,
            tip: { type: 'success', text: 'Your first automation is live. Every qualifying email now logs itself automatically.' }
          }
        ]
      },
      intermediate: {
        title: 'Multi-Step Workflows with Filters & Routers',
        description: 'Build smarter automations that branch based on conditions.',
        duration: '25 min',
        steps: [
          {
            title: 'Use a Router for conditional branches',
            content: `<p>Right-click on any connection and select <strong>Add a Router</strong>. A router splits your workflow into multiple paths based on conditions.</p>
<p>Example: If email subject contains "Invoice" → route to accounting sheet. Otherwise → route to general inbox sheet.</p>`,
            tip: { type: 'tip', text: 'Routers are the most powerful Make.com feature. Master them and you can automate almost any business process.' }
          },
          {
            title: 'Set up Filters',
            content: `<p>Click the small circle between two modules to add a <strong>Filter</strong>. Filters stop execution if conditions aren't met.</p>
<p>Example: Only proceed if email sender domain equals "yourclient.com". This prevents irrelevant data from polluting your automations.</p>`,
            tip: null
          },
          {
            title: 'Connect AI with OpenAI module',
            content: `<p>Add an <strong>OpenAI → Create a Completion</strong> module. Pass the email body as the prompt context. Ask GPT to: extract action items, classify the email, draft a reply, or summarize it.</p>
<p>Pass GPT's output to the next module — you've just added AI brains to any automation.</p>`,
            tip: { type: 'info', text: 'This is the pattern behind 90% of "AI automation" use cases you see on LinkedIn.' }
          },
          {
            title: 'Schedule and monitor scenarios',
            content: `<p>Set each scenario to run every 15 min, hourly, or daily via <strong>Scheduling</strong>. In the dashboard, <strong>Scenario History</strong> shows every run — green (success), orange (skipped), red (error).</p>
<p>Click any error run to see exactly which module failed and why.</p>`,
            tip: { type: 'success', text: 'Error notifications (Settings → Notifications) let you know the moment an automation breaks — before it causes real problems.' }
          }
        ]
      },
      advanced: {
        title: 'Build an AI Content Factory',
        description: 'A full end-to-end content automation system using Make.com + AI.',
        duration: '60 min',
        steps: [
          {
            title: 'Design the pipeline architecture',
            content: `<p>The full content factory pipeline:</p>
<ol>
  <li>Input: Google Sheet row (keyword + tone + audience)</li>
  <li>Generate: OpenAI writes title, outline, full draft</li>
  <li>Optimize: NeuronWriter API scores SEO (optional)</li>
  <li>Publish: WordPress REST API creates draft post</li>
  <li>Notify: Slack posts URL to your review channel</li>
</ol>`,
            tip: { type: 'tip', text: 'Plan the full flow on paper before building. Make.com canvas gets complex fast — a clear blueprint saves hours of rewiring.' }
          },
          {
            title: 'Build the Google Sheets trigger',
            content: `<p>Use <strong>Google Sheets → Watch New Rows</strong> as your trigger. Each new row = one piece of content to generate. Columns: keyword, content type, target audience, CTA, status.</p>
<p>Set status column to "Generating" using <em>Update Row</em> immediately after trigger — so you know it's in flight.</p>`,
            tip: null
          },
          {
            title: 'Chain multiple AI calls',
            content: `<p>Use separate OpenAI modules for each task: first module → generate outline, second module → expand each section (use iterator), third module → combine into full article.</p>
<p>This produces longer, more structured content than one giant prompt.</p>`,
            tip: { type: 'info', text: 'Break complex AI tasks into small, specific prompts chained together. Specificity beats length every time.' }
          },
          {
            title: 'Handle errors gracefully',
            content: `<p>Add error handlers (<strong>Break</strong> or <strong>Resume</strong>) to critical modules. If the OpenAI call fails, route to a Slack alert instead of silently failing.</p>
<p>Set the status column to "Failed" on errors so you can identify and retry specific rows without reprocessing the whole sheet.</p>`,
            tip: { type: 'success', text: 'A robust automation with error handling is worth 10x a fragile one. Your future self will thank you.' }
          }
        ]
      }
    }
  },

  /* ── Simplified ── */
  'simplified': {
    name: 'Simplified',
    domain: 'simplified.com',
    affiliate_url: 'https://simplified.com?fpr=benjie19',
    category: 'Writing',
    tagline: 'AI Writing, Design & Social Media',
    color: '#ec4899',
    levels: {
      basic: {
        title: 'Write Marketing Copy in Minutes',
        description: 'Use Simplified AI to generate social media posts, ad copy, and blog intros.',
        duration: '10 min',
        steps: [
          {
            title: 'Choose your content type',
            content: `<p>In the Simplified dashboard, click <strong>AI Writer</strong>. Browse 50+ templates: social media captions, product descriptions, email subject lines, blog intros, ad headlines, and more.</p>
<p>Start with <strong>Social Media Caption</strong> — it's the fastest win.</p>`,
            tip: { type: 'info', text: 'Simplified\'s free plan gives 2,000 AI words/month. Enough to test and see results before upgrading.' }
          },
          {
            title: 'Fill in the brief',
            content: `<p>Each template has a short brief form. Example for Instagram caption:</p>
<ul><li>Topic: "New AI tool for content creators"</li><li>Tone: Enthusiastic</li><li>Platform: Instagram</li><li>Include: hashtags, emoji, call to action</li></ul>
<p>Click <strong>Generate</strong>. You'll get 3 variations in seconds.</p>`,
            tip: null
          },
          {
            title: 'Edit and refine',
            content: `<p>Pick the best variation and click <strong>Edit</strong>. Simplified's editor lets you rewrite sentences, change tone ("Make it shorter", "More professional"), or expand sections on the fly.</p>
<p>Use <strong>Rephrase</strong> on any sentence to get 5 alternatives instantly.</p>`,
            tip: { type: 'tip', text: 'AI output is 80% of the way there. Your job is the last 20% — add your voice, specific details, and human judgment.' }
          },
          {
            title: 'Export or publish',
            content: `<p>Copy the text directly, or if you're using Simplified for design: drag the copy into your graphic template and export as PNG/MP4.</p>
<p>Simplified integrates with Buffer and Hootsuite for direct social scheduling.</p>`,
            tip: { type: 'success', text: 'You just wrote a week of social content in 10 minutes. Batch-generate on Monday, schedule the week, done.' }
          }
        ]
      },
      intermediate: {
        title: 'Long-Form AI Writing & Brand Voice',
        description: 'Train Simplified on your brand voice and generate consistent long-form content.',
        duration: '20 min',
        steps: [
          {
            title: 'Set your Brand Voice',
            content: `<p>Under <strong>Settings → Brand Voice</strong>, paste 3–5 examples of your best existing content. Simplified learns your style: vocabulary, sentence length, tone, formality.</p>
<p>All future AI generations will match this voice — not generic AI prose.</p>`,
            tip: { type: 'tip', text: 'The more examples you provide, the more accurate your brand voice capture. Use your top-performing content.' }
          },
          {
            title: 'Generate a full blog post',
            content: `<p>Use <strong>AI Writer → Blog Post (Long Form)</strong>. Input title, keywords, audience, and desired word count. Click <strong>Generate Outline</strong> first, review it, then click <strong>Generate Full Post</strong>.</p>
<p>1,500-word posts take ~60 seconds to generate.</p>`,
            tip: null
          },
          {
            title: 'Repurpose content across formats',
            content: `<p>Paste your blog post into <strong>Repurpose Content</strong>. Simplified auto-generates:</p>
<ul>
  <li>3 Twitter thread variations</li>
  <li>LinkedIn article intro</li>
  <li>5 Instagram captions</li>
  <li>Email newsletter version</li>
</ul>
<p>One blog post → a week of multi-platform content.</p>`,
            tip: { type: 'info', text: 'Content repurposing is the highest-leverage move in content marketing. Most creators underuse it.' }
          },
          {
            title: 'Create AI images for your content',
            content: `<p>In <strong>AI Image Generator</strong>, describe the visual you need. Example: "Minimalist flat illustration of a robot writing on a laptop, blue palette."</p>
<p>Generate 4 options, pick the best, use it as your blog header or social graphic.</p>`,
            tip: { type: 'success', text: 'Consistent visual style + consistent brand voice = professional content output that builds trust with your audience.' }
          }
        ]
      },
      advanced: {
        title: 'Team Content Operations at Scale',
        description: 'Use Simplified to run a full content team workflow — briefs, drafts, approvals, publishing.',
        duration: '45 min',
        steps: [
          {
            title: 'Set up team workspaces',
            content: `<p>In <strong>Team</strong>, invite writers, designers, and editors. Assign roles: Creator (can write/design), Reviewer (can comment, not publish), Admin (full access).</p>
<p>Organize by client or content type using Projects.</p>`,
            tip: { type: 'info', text: 'Team collaboration is available on the Small Team plan and above.' }
          },
          {
            title: 'Build content brief templates',
            content: `<p>Create a standard AI brief template for each content type: blog posts, product descriptions, email campaigns. Save them in <strong>Templates</strong>.</p>
<p>Anyone on the team runs the template → AI generates a consistent starting draft → human refines and approves.</p>`,
            tip: { type: 'tip', text: 'Standardized briefs mean consistent output regardless of who runs the generation. No more "voice roulette."' }
          },
          {
            title: 'Approval workflows',
            content: `<p>Use <strong>Comments</strong> and <strong>Version History</strong> for review cycles. Reviewers can mark drafts as Approved, Needs Revision, or Rejected with inline comments on specific sections.</p>
<p>Set up a Zapier/Make.com integration to notify Slack when a draft is ready for review.</p>`,
            tip: null
          },
          {
            title: 'Analytics: what content performs',
            content: `<p>Connect Simplified to your analytics (Google Analytics, social insights) to see which AI-assisted content drives the most traffic and engagement.</p>
<p>Feed top performers back as brand voice examples. Your AI output improves as you learn what works.</p>`,
            tip: { type: 'success', text: 'The content flywheel: data informs strategy → AI accelerates production → analytics feed back into data. Run this loop and compound.' }
          }
        ]
      }
    }
  },

  /* ── OpusClip ── */
  'opusclip': {
    name: 'OpusClip',
    domain: 'opus.pro',
    affiliate_url: 'https://www.opus.pro/?via=myaitoolsfinder',
    category: 'Video',
    tagline: 'AI Short-Form Video Clips from Long Videos',
    color: '#f97316',
    levels: {
      basic: {
        title: 'Turn Long Videos into Viral Clips',
        description: 'Upload a 30-minute video and get 10 ready-to-post short clips in minutes.',
        duration: '10 min',
        steps: [
          {
            title: 'Upload or paste a video URL',
            content: `<p>In OpusClip, click <strong>Create Clips</strong>. You can: upload an MP4, paste a YouTube URL, or connect your Zoom cloud recordings.</p>
<p>OpusClip accepts up to 3-hour videos. Most people use 30–90 min webinars, podcasts, or YouTube videos.</p>`,
            tip: { type: 'info', text: 'OpusClip\'s free plan gives 60 minutes of processing/month. One 60-minute video → 10–15 clips.' }
          },
          {
            title: 'Set your clip preferences',
            content: `<p>Before processing, configure:</p>
<ul>
  <li><strong>Clip duration:</strong> 30–60 sec (TikTok/Reels) or 60–90 sec (YouTube Shorts)</li>
  <li><strong>Aspect ratio:</strong> 9:16 for vertical, 1:1 for square</li>
  <li><strong>Language:</strong> 20+ languages supported</li>
</ul>
<p>Click <strong>Get Clips</strong> and wait 5–15 minutes for processing.</p>`,
            tip: null
          },
          {
            title: 'Review AI-scored clips',
            content: `<p>OpusClip ranks each clip with a <strong>Virality Score</strong> (0–100) based on hook strength, pacing, and content quality. Start with the highest-scored clips.</p>
<p>Each clip comes with auto-generated captions, speaker tracking, and a highlight reel.</p>`,
            tip: { type: 'tip', text: 'The Virality Score is a guide, not a guarantee. Watch each top clip — sometimes the 2nd or 3rd score is your best content.' }
          },
          {
            title: 'Download or schedule to social',
            content: `<p>Click any clip → <strong>Edit</strong> to adjust trim points, edit captions, change caption style/color, or add a logo/watermark.</p>
<p>Click <strong>Publish</strong> to schedule directly to TikTok, Instagram, YouTube Shorts, LinkedIn, or Twitter.</p>`,
            tip: { type: 'success', text: 'You turned one hour of content into 2 weeks of daily short-form posts. That\'s the leverage.' }
          }
        ]
      },
      intermediate: {
        title: 'Caption Styling, Hooks & Brand Templates',
        description: 'Make your clips stand out with branded captions and strong opening hooks.',
        duration: '20 min',
        steps: [
          {
            title: 'Customize caption styles',
            content: `<p>In clip editor, click <strong>Captions</strong>. OpusClip offers 15+ caption templates: karaoke-style (word-by-word highlight), bold bottom captions, multicolor text, etc.</p>
<p>Match your brand colors. The right caption style can 2–3x your retention rate.</p>`,
            tip: { type: 'tip', text: 'Karaoke-style captions consistently outperform static text for engagement — they keep eyes on the screen.' }
          },
          {
            title: 'Edit and improve the hook',
            content: `<p>The first 3 seconds determine if someone keeps watching. In the editor, trim the clip start to begin at a moment of tension, a bold statement, or a question.</p>
<p>Use <strong>AI Hook Generator</strong> to overlay a text hook at the top (e.g. "Most creators make this mistake...") if the natural opening isn't strong enough.</p>`,
            tip: null
          },
          {
            title: 'Create a Brand Kit',
            content: `<p>In <strong>Brand Kit</strong>, upload your logo, set brand colors, and choose a default caption style. Every clip generated now automatically applies your brand.</p>
<p>No manual styling on every clip — just select, review, and publish.</p>`,
            tip: { type: 'info', text: 'Brand Kit is available on Pro plan. At scale, this saves 30+ minutes per video processed.' }
          },
          {
            title: 'Analyze which clips perform',
            content: `<p>In <strong>Analytics</strong> (after connecting social accounts), see which clips got the most views, saves, and shares by platform.</p>
<p>Identify patterns: what topics, what clip length, what caption style performs best for your audience. Adjust your recording and editing strategy accordingly.</p>`,
            tip: { type: 'success', text: 'Most short-form creators who consistently analyze performance double their views within 90 days.' }
          }
        ]
      },
      advanced: {
        title: 'Content Production Pipeline for Creators & Agencies',
        description: 'Process multiple videos per week with team collaboration and API automation.',
        duration: '50 min',
        steps: [
          {
            title: 'Set up team access',
            content: `<p>Invite team members in <strong>Settings → Team</strong>. Assign roles: Video Editor (clips + edits), Social Manager (publish only), Admin (full access).</p>
<p>Agencies: create separate workspaces per client. Each workspace has its own Brand Kit and social connections.</p>`,
            tip: null
          },
          {
            title: 'Batch process a library',
            content: `<p>Upload multiple videos in one session. While they process in parallel, review and edit previously completed batches. Build a queue and work assembly-line style.</p>
<p>Goal: 5 long-form videos → 50–75 clips → 2–3 months of daily short-form content.</p>`,
            tip: { type: 'tip', text: 'Batch recording sessions (record 4 long videos in one day) make this pipeline even more powerful.' }
          },
          {
            title: 'Automate publishing schedules',
            content: `<p>In <strong>Publishing</strong>, set platform-specific schedules: TikTok at 7PM, Instagram at 12PM, LinkedIn at 8AM. OpusClip publishes automatically at optimal times.</p>
<p>Connect via Make.com to trigger additional actions when a clip publishes (e.g. email newsletter teaser, Discord announcement).</p>`,
            tip: { type: 'info', text: 'Consistency beats perfection. 1 clip/day for 90 days outperforms 10 clips/week for 2 weeks.' }
          },
          {
            title: 'Use OpusClip API for custom workflows',
            content: `<p>The OpusClip API allows programmatic video submission and clip retrieval. Integrate into your CMS: when a podcast episode publishes, automatically submit it to OpusClip and receive clips via webhook.</p>
<p>Combine with AI captioning corrections and brand watermarking for a fully automated short-form publishing engine.</p>`,
            tip: { type: 'success', text: 'This pipeline — when fully automated — turns one recording session per week into a full social media presence across all platforms.' }
          }
        ]
      }
    }
  },

  /* ── Keyword Insights ── */
  'keyword-insights': {
    name: 'Keyword Insights',
    domain: 'keywordinsights.ai',
    affiliate_url: 'https://www.keywordinsights.ai/?ref=myaitoolsfinder',
    category: 'SEO',
    tagline: 'AI Keyword Research & Content Clustering',
    color: '#16a34a',
    levels: {
      basic: {
        title: 'Find Keywords That Actually Drive Traffic',
        description: 'Use Keyword Insights to discover and cluster keywords for your content strategy.',
        duration: '15 min',
        steps: [
          {
            title: 'Run a keyword research report',
            content: `<p>In Keyword Insights, click <strong>Keyword Research</strong>. Enter a seed keyword (e.g. "AI writing tools"). Select your country and language. Click <strong>Get Keywords</strong>.</p>
<p>The tool pulls thousands of related keywords from Google's autocomplete and related searches, with volume and difficulty data.</p>`,
            tip: { type: 'info', text: 'Keyword Insights uses real search data — not estimates. Volume numbers are more accurate than many competing tools.' }
          },
          {
            title: 'Understand keyword metrics',
            content: `<p>For each keyword, review:</p>
<ul>
  <li><strong>Volume:</strong> monthly searches. Aim for 100–5,000 as a new site</li>
  <li><strong>KD (Keyword Difficulty):</strong> 0–100. Start with under 30</li>
  <li><strong>CPC:</strong> commercial value indicator. High CPC = buyers, not just browsers</li>
  <li><strong>Intent:</strong> Informational / Navigational / Commercial / Transactional</li>
</ul>`,
            tip: null
          },
          {
            title: 'Cluster keywords automatically',
            content: `<p>Select all keywords and click <strong>Cluster</strong>. Keyword Insights groups them by SERP similarity — keywords that share the same top-ranking pages should be in one article.</p>
<p>This prevents keyword cannibalization (two of your pages competing for the same term).</p>`,
            tip: { type: 'tip', text: 'Clustering is Keyword Insights\' killer feature. Don\'t write content without clustering first — you\'ll waste half your effort.' }
          },
          {
            title: 'Build your content plan',
            content: `<p>Export clusters as CSV. Each cluster = one article to write. Sort by: lowest difficulty first to build early rankings, then highest volume for bigger wins later.</p>
<p>A 50-keyword research session → 8–12 article ideas ready to execute.</p>`,
            tip: { type: 'success', text: 'You now have a 3-month content roadmap based on data — not guesses. This is how sites grow predictably.' }
          }
        ]
      },
      intermediate: {
        title: 'Intent Mapping & Content Gap Analysis',
        description: 'Find what your competitors rank for that you don\'t — and close the gap.',
        duration: '25 min',
        steps: [
          {
            title: 'Run a competitor keyword gap',
            content: `<p>In <strong>Competitor Analysis</strong>, enter 3 competitor domains. Keyword Insights shows every keyword they rank for that you don't.</p>
<p>Filter by: low difficulty, high volume, transactional intent. These are your easiest traffic wins.</p>`,
            tip: { type: 'tip', text: 'Pick competitors just above your traffic level — not the dominant 10-year-old sites. Gap analysis works best against similar-sized sites.' }
          },
          {
            title: 'Map search intent to content type',
            content: `<p>Informational intent → blog posts, guides, tutorials<br>
Commercial intent → comparison pages, reviews ("best X for Y")<br>
Transactional intent → landing pages, product pages<br>
Navigational → branded content</p>
<p>Mismatching intent is the #1 reason a well-written page fails to rank.</p>`,
            tip: null
          },
          {
            title: 'Identify quick-win pages',
            content: `<p>In <strong>Rank Tracker</strong>, find your pages currently ranking positions 11–20 (page 2 of Google). These are your fastest wins — small optimizations can push them to page 1.</p>
<p>Export these and refresh each article: add the missing NLP terms, improve the intro, update statistics.</p>`,
            tip: { type: 'info', text: 'Pushing 10 articles from position 15 to position 5 can 3–5x your organic traffic in 60 days.' }
          },
          {
            title: 'SERP feature targeting',
            content: `<p>Filter keywords by <strong>SERP Features</strong>: Featured Snippets, People Also Ask, Image Packs. Pages that win these features get 2–5x normal CTR.</p>
<p>For Featured Snippet keywords: answer the query directly in the first 2 paragraphs with a concise, definition-style response.</p>`,
            tip: { type: 'success', text: 'A single Featured Snippet on a 1,000/month keyword can drive more traffic than 10 page-2 rankings combined.' }
          }
        ]
      },
      advanced: {
        title: 'Programmatic SEO & Topical Authority Maps',
        description: 'Build a systematic content empire with AI-assisted keyword strategy at scale.',
        duration: '60 min',
        steps: [
          {
            title: 'Build a topical authority map',
            content: `<p>A topical authority map = every subtopic your site needs to cover to be considered an expert by Google on a broad subject.</p>
<p>Use Keyword Insights to: research 500+ keywords in your niche → cluster them → organize clusters into pillar/spoke relationships → prioritize by impact.</p>`,
            tip: { type: 'tip', text: 'Sites with topical authority rank for new articles faster — Google trusts sites that thoroughly cover a subject.' }
          },
          {
            title: 'Set up programmatic keyword research',
            content: `<p>For ecommerce or review sites: use Keyword Insights' bulk upload to research hundreds of product/comparison keywords at once.</p>
<p>Example: upload a list of 500 tools and get "tool A vs tool B", "best tool A for X" keywords in bulk. Each = a programmatic landing page opportunity.</p>`,
            tip: null
          },
          {
            title: 'Connect to your content workflow',
            content: `<p>Export keyword clusters directly to your content team's Google Sheet or project management tool. Add columns: assigned writer, target publish date, status, live URL, current ranking.</p>
<p>Review rankings monthly — refresh underperforming pages based on updated keyword data.</p>`,
            tip: { type: 'info', text: 'The highest-ROI SEO activities: refresh existing content (80%), build new clusters (15%), technical fixes (5%).' }
          },
          {
            title: 'Track ROI per content piece',
            content: `<p>Connect Keyword Insights rank tracking with Google Analytics traffic data. Calculate revenue per keyword cluster by combining ranking position, organic CTR, traffic, and conversion rate.</p>
<p>Double down on high-ROI clusters. Deprioritize low-traffic, high-effort topics.</p>`,
            tip: { type: 'success', text: 'The content teams that grow fastest are the ones that ruthlessly measure and reallocate toward what works.' }
          }
        ]
      }
    }
  },

  /* ── Taskade AI ── */
  'taskade-ai': {
    name: 'Taskade AI',
    domain: 'taskade.com',
    affiliate_url: 'https://www.taskade.com/?via=b3q5tf',
    category: 'Productivity',
    tagline: 'AI-Powered Project Management & Collaboration',
    color: '#8b5cf6',
    levels: {
      basic: {
        title: 'Organize Your Work with AI',
        description: 'Create smart task lists, project plans, and mind maps in seconds.',
        duration: '10 min',
        steps: [
          {
            title: 'Create your first workspace',
            content: `<p>Sign up and create a Workspace (your main space) and a Project inside it. Projects hold your tasks, documents, and mind maps.</p>
<p>Taskade works best as an all-in-one: tasks + docs + team chat in one place.</p>`,
            tip: { type: 'info', text: 'Taskade\'s free plan includes unlimited projects and basic AI features. The AI gets significantly more powerful on paid plans.' }
          },
          {
            title: 'Use AI to generate a task list',
            content: `<p>In any project, type "/" and select <strong>AI Generate</strong>. Describe what you're working on: "Launch a personal blog in 30 days."</p>
<p>Taskade AI generates a full project plan with tasks, subtasks, and even suggested timelines.</p>`,
            tip: { type: 'tip', text: 'The more specific your description, the better the output. "Launch AI tools review blog targeting freelancers" beats "start a blog."' }
          },
          {
            title: 'Switch views',
            content: `<p>Toggle between views with one click: <strong>List</strong> (tasks), <strong>Board</strong> (Kanban), <strong>Calendar</strong>, <strong>Mind Map</strong>, and <strong>Gantt</strong>.</p>
<p>Mind Map view is unique to Taskade — perfect for brainstorming before organizing into tasks.</p>`,
            tip: null
          },
          {
            title: 'Add AI to your daily tasks',
            content: `<p>Right-click any task to: <em>Expand with AI</em> (adds subtasks), <em>Explain with AI</em> (adds context), or <em>Prioritize with AI</em> (reorders by impact).</p>
<p>It's like having a project manager embedded in every task.</p>`,
            tip: { type: 'success', text: 'A 30-minute project planning session becomes a 3-minute AI conversation. That\'s the real time savings.' }
          }
        ]
      },
      intermediate: {
        title: 'Custom AI Agents for Your Workflows',
        description: 'Build AI agents that handle recurring work tasks automatically.',
        duration: '20 min',
        steps: [
          {
            title: 'Create a custom AI Agent',
            content: `<p>In <strong>AI Agents</strong>, click <strong>New Agent</strong>. Give your agent a name, role description, and set of instructions.</p>
<p>Example: "Content Strategist — given a blog post idea, create a full outline, keyword suggestions, and target audience notes."</p>`,
            tip: { type: 'tip', text: 'Agents remember their instructions across conversations. Set them up once, use them forever.' }
          },
          {
            title: 'Train the agent on your docs',
            content: `<p>Add documents, SOPs, and style guides to your agent's <strong>Knowledge Base</strong>. The agent uses this context to give answers specific to your business — not generic advice.</p>
<p>Upload: company playbooks, past project templates, brand guidelines, product docs.</p>`,
            tip: { type: 'info', text: 'This is essentially building a custom ChatGPT trained on your company\'s specific knowledge.' }
          },
          {
            title: 'Use agents in team projects',
            content: `<p>In any project, invoke your custom agent with "@AgentName". It can answer questions, generate content, review task lists, and suggest next steps — all in context.</p>
<p>Share agents with team members so everyone has the same AI assistant with the same knowledge.</p>`,
            tip: null
          },
          {
            title: 'Automate with Taskade workflows',
            content: `<p>In <strong>Automations</strong>, create rules: "When task is marked complete → AI agent writes follow-up email draft → create new task for review."</p>
<p>Chain 3–5 automations to build complete workflow loops that run without manual intervention.</p>`,
            tip: { type: 'success', text: 'Teams that document their workflows in Taskade and add AI agents consistently report 30–40% faster project completion.' }
          }
        ]
      },
      advanced: {
        title: 'Build a Team AI Operations System',
        description: 'Deploy AI agents across your entire team for scalable, consistent operations.',
        duration: '45 min',
        steps: [
          {
            title: 'Map your recurring workflows',
            content: `<p>List every task your team does repeatedly: client onboarding, content creation, weekly reports, code review, customer support responses. Each is a candidate for AI agent automation.</p>
<p>Prioritize by: frequency × time cost per instance. Start with the highest number.</p>`,
            tip: { type: 'tip', text: 'Most teams discover that 3–4 workflows account for 60% of repetitive work. Solve those first.' }
          },
          {
            title: 'Build a multi-agent system',
            content: `<p>Create specialized agents: Research Agent (web search + summarize), Writing Agent (draft content in brand voice), Review Agent (check quality vs standards), Publishing Agent (prepare for release).</p>
<p>Coordinate them via a project template that routes work from agent to agent automatically.</p>`,
            tip: null
          },
          {
            title: 'Integrate with your tool stack',
            content: `<p>Connect Taskade to: GitHub (code task tracking), Slack (notifications), Google Drive (document sync), Zapier/Make.com (external triggers).</p>
<p>A GitHub PR opened → Taskade creates a review task → assigned team member notified in Slack → agent generates review checklist.</p>`,
            tip: { type: 'info', text: 'Taskade integrations are available on the Pro plan and above.' }
          },
          {
            title: 'Measure team AI adoption',
            content: `<p>In <strong>Analytics</strong>, track: tasks completed per member, AI interactions per project, time from task creation to completion. Identify where AI is saving time and where manual work remains.</p>
<p>Hold a monthly "AI ops review" — review what's working, improve agent prompts, add new automations.</p>`,
            tip: { type: 'success', text: 'The teams that treat AI operations as a system to improve — not a tool to use — consistently outpace those that don\'t.' }
          }
        ]
      }
    }
  },

  /* ── Submagic AI ── */
  'submagic-ai': {
    name: 'Submagic AI',
    domain: 'submagic.co',
    affiliate_url: 'https://submagic.co/?via=benjie11',
    category: 'Video',
    tagline: 'AI Captions & Video Editing for Short-Form',
    color: '#06b6d4',
    levels: {
      basic: {
        title: 'Add Viral Captions to Your Videos',
        description: 'Upload a video and get auto-generated, styled captions in 60 seconds.',
        duration: '5 min',
        steps: [
          {
            title: 'Upload your video',
            content: `<p>Sign into Submagic and click <strong>Upload Video</strong>. Accepts MP4, MOV, and WebM. Ideal for videos 30 seconds to 15 minutes long.</p>
<p>Submagic is optimized for short-form: TikTok, Instagram Reels, YouTube Shorts.</p>`,
            tip: { type: 'info', text: 'Submagic\'s free plan allows 10 minutes of captioned video per month. Enough to test results on your first few posts.' }
          },
          {
            title: 'Auto-generate captions',
            content: `<p>Submagic transcribes your video in seconds using AI. The transcript appears in the editor — review it for any errors (proper nouns and brand names sometimes need correction).</p>
<p>Supported in 48 languages. Great for multilingual content creators.</p>`,
            tip: null
          },
          {
            title: 'Choose a caption style',
            content: `<p>Browse 15+ caption templates: animated word-by-word, gradient highlight, bold drop shadow, emoji overlays, and more.</p>
<p>Click any template to preview it on your video. The right style can increase watch time by 40%+ on silent scrollers.</p>`,
            tip: { type: 'tip', text: 'Test 2–3 caption styles on similar videos. The one with the highest retention wins — stick with it for consistency.' }
          },
          {
            title: 'Export and post',
            content: `<p>Click <strong>Export</strong>. Choose resolution (1080p recommended) and format. Video downloads in under a minute.</p>
<p>Post directly from Submagic to TikTok, Instagram, or YouTube, or download and post manually.</p>`,
            tip: { type: 'success', text: '85% of social videos are watched without sound. Captions aren\'t optional — they\'re essential.' }
          }
        ]
      },
      intermediate: {
        title: 'AI Video Editing & B-Roll Generation',
        description: 'Use Submagic to auto-cut filler words, add B-roll, and polish your videos.',
        duration: '20 min',
        steps: [
          {
            title: 'Auto-remove filler words',
            content: `<p>In the editor, enable <strong>Remove Fillers</strong>. Submagic identifies "um," "uh," "like," "you know," and long pauses — then removes them automatically.</p>
<p>A 10-minute raw recording often becomes a tighter 7-minute final cut. Better pacing = higher retention.</p>`,
            tip: { type: 'tip', text: 'Always preview before exporting — occasionally context is lost when "you know" is removed mid-thought.' }
          },
          {
            title: 'Add AI-generated B-roll',
            content: `<p>In <strong>B-Roll</strong>, Submagic reads your transcript and suggests relevant stock footage or AI-generated clips to insert at key moments.</p>
<p>Click to preview, approve, or replace. B-roll breaks up talking-head footage and dramatically improves watch time.</p>`,
            tip: null
          },
          {
            title: 'Add text overlays & hooks',
            content: `<p>Use <strong>Text Overlays</strong> to add a bold hook in the first 2 seconds: "This changed everything for me" or a question that teases the content.</p>
<p>Add an end-screen CTA overlay: "Follow for more AI tips →" or "Link in bio."</p>`,
            tip: { type: 'info', text: 'The first 2 seconds and the last 3 seconds of a short-form video are the highest-leverage moments. Optimize both.' }
          },
          {
            title: 'Brand your videos consistently',
            content: `<p>In <strong>Brand Kit</strong>, upload your logo, set brand colors for captions and overlays, and save a default template. Every video exported matches your brand automatically.</p>
<p>Consistency across all videos builds audience recognition and professional credibility.</p>`,
            tip: { type: 'success', text: 'Viewers who recognize your caption style and visual brand are 3x more likely to follow and engage.' }
          }
        ]
      },
      advanced: {
        title: 'Scale a Short-Form Video Production System',
        description: 'Process and publish high volumes of short-form content with Submagic at team scale.',
        duration: '45 min',
        steps: [
          {
            title: 'Build a content batch system',
            content: `<p>Record 5–10 raw short-form videos in one session. Upload all to Submagic at once. While the first batch processes, script the next batch.</p>
<p>With consistent templates (caption style, B-roll rules, hook overlays), you can produce 10 ready-to-post videos in 2 hours.</p>`,
            tip: { type: 'tip', text: 'Batch production beats daily production for consistency. Remove the daily decision-making friction.' }
          },
          {
            title: 'A/B test caption styles',
            content: `<p>Export the same video with 2 different caption styles. Post both on the same platform (as a comparison test, or to different accounts). Compare completion rate and engagement after 48 hours.</p>
<p>After 10 tests, you'll have data on exactly what style works for your audience.</p>`,
            tip: null
          },
          {
            title: 'Team collaboration for agencies',
            content: `<p>Agencies managing multiple clients: create a separate workspace per client. Assign editors per workspace. Each client has their own Brand Kit, templates, and publishing schedule.</p>
<p>Reviewers can preview and approve videos in Submagic before the editor exports — no back-and-forth file transfers.</p>`,
            tip: { type: 'info', text: 'Team plans allow unlimited workspaces. At 5+ clients, the time savings vs. manual editing pays for itself in week one.' }
          },
          {
            title: 'Automate the publish pipeline',
            content: `<p>Connect Submagic → Make.com → social publishing. Trigger: video exported from Submagic → Make.com picks it up → schedules across all platforms at optimal times → logs in Google Sheet.</p>
<p>When fully set up, new videos go from "exported" to "published on all platforms" without touching another app.</p>`,
            tip: { type: 'success', text: 'Short-form video is the highest-ROI content channel right now. The creators who systemize it win. Be one of them.' }
          }
        ]
      }
    }
  },

  /* ── ChatGPT ── */
  'chatgpt': {
    name: 'ChatGPT',
    domain: 'chat.openai.com',
    affiliate_url: '',
    category: 'Chatbot',
    tagline: 'Write, research, code and think with the world\'s most popular AI',
    color: '#10a37f',
    levels: {
      basic: {
        title: 'Your First Hour with ChatGPT',
        description: 'Go from blank page to useful AI assistant in under 10 minutes.',
        duration: '10 min',
        steps: [
          {
            title: 'Create your free account',
            content: `<p>Go to <strong>chat.openai.com</strong> and click <em>Sign Up</em>. Use Google or email — the free plan is genuinely useful with GPT-4o access.</p>
<p>Once logged in, you see the chat interface. The text box at the bottom is where you type. Simple.</p>`,
            tip: { type: 'info', text: 'The free plan gives access to GPT-4o (OpenAI\'s best model). ChatGPT Plus ($20/mo) removes limits and adds faster responses.' }
          },
          {
            title: 'Understand what makes a good prompt',
            content: `<p>ChatGPT responds to whatever you type. Vague prompts = vague answers. Specific prompts = specific, useful answers.</p>
<p><strong>Weak:</strong> "Write a bio"<br><strong>Strong:</strong> "Write a 3-sentence professional bio for a freelance graphic designer with 5 years of experience. Tone: confident but approachable."</p>
<p>The formula: <em>Task + Context + Format + Tone</em>.</p>`,
            tip: { type: 'tip', text: 'If the first response isn\'t right, say "make it shorter", "more formal", or "give me 3 alternatives" — ChatGPT remembers the conversation.' }
          },
          {
            title: 'Try your first real task',
            content: `<p>Pick something you genuinely need done. Great starters:</p>
<ul>
  <li>"Summarise this article: [paste text]"</li>
  <li>"Write a subject line for an email about [topic]"</li>
  <li>"Explain [concept] like I'm 10 years old"</li>
  <li>"Fix the grammar in this paragraph: [paste]"</li>
</ul>`,
            tip: null
          },
          {
            title: 'Use the file and image upload',
            content: `<p>Click the <strong>paperclip icon</strong> in the chat bar to upload a file (PDF, Word, CSV, image). ChatGPT reads it and answers questions about it.</p>
<p>Example: upload a 20-page report and ask "What are the 5 most important takeaways?"</p>`,
            tip: { type: 'info', text: 'Image upload lets you share a screenshot and ask "What\'s wrong with this design?" or "Read the text in this photo."' }
          },
          {
            title: 'Organise with Projects',
            content: `<p>In the left sidebar, click <strong>New project</strong>. Projects keep related conversations together and let you give ChatGPT persistent context — e.g. "Always respond in British English" or "I run a bakery in Melbourne."</p>
<p>Create one project per client, topic, or goal.</p>`,
            tip: { type: 'success', text: 'You\'ve now got a 24/7 AI collaborator. The more specific context you give it, the better every response becomes.' }
          }
        ]
      },
      intermediate: {
        title: 'Prompt Engineering & Custom Instructions',
        description: 'Get dramatically better results by learning how ChatGPT actually works.',
        duration: '20 min',
        steps: [
          {
            title: 'Set Custom Instructions',
            content: `<p>Click your profile icon → <strong>Customize ChatGPT</strong>. You get two boxes:</p>
<ul>
  <li><strong>About you:</strong> "I'm a marketing consultant who specialises in SaaS. I work with B2B companies with 10-200 employees."</li>
  <li><strong>Response style:</strong> "Be direct. Skip preamble. Use bullet points where helpful. Always give a concrete example."</li>
</ul>
<p>These instructions apply to every new conversation automatically.</p>`,
            tip: { type: 'tip', text: 'Spend 10 minutes writing good custom instructions once — it will improve thousands of future responses.' }
          },
          {
            title: 'Use role-setting and chain prompting',
            content: `<p><strong>Role-setting</strong>: Start with "Act as a [role]..." to prime the model. Example: "Act as a senior copywriter who specialises in email marketing. Here's a product description..."</p>
<p><strong>Chain prompting</strong>: Break complex tasks into steps. First ask for an outline, then expand each section, then refine. You get much better quality than asking for everything at once.</p>`,
            tip: null
          },
          {
            title: 'Use the Canvas for documents',
            content: `<p>Click the <strong>Canvas</strong> button (grid icon) when writing longer documents. Canvas opens a side-by-side editor where you can highlight sections and ask ChatGPT to rewrite just that part.</p>
<p>Great for blog posts, proposals, reports — anything over 300 words.</p>`,
            tip: { type: 'info', text: 'In Canvas, you can ask it to "adjust reading level", "add more examples", or "make this section punchier" on any selected text.' }
          },
          {
            title: 'Analyse data with the code interpreter',
            content: `<p>Upload a CSV or spreadsheet. Ask: "Summarise this data", "Create a chart showing sales by month", or "Which row has the highest value in column C?"</p>
<p>ChatGPT runs real Python code behind the scenes and shows you the result — no coding required from you.</p>`,
            tip: { type: 'tip', text: 'You can download charts generated by ChatGPT as PNG files. Useful for quick reports or presentations.' }
          },
          {
            title: 'Build a reusable prompt library',
            content: `<p>Keep a running note (Notion, Apple Notes, anywhere) of prompts that gave you great results. Tag them by use case: "emails", "research", "social media".</p>
<p>Within ChatGPT, you can also save and reuse prompt templates in the chat bar using the <strong>Saved prompts</strong> feature.</p>`,
            tip: { type: 'success', text: 'A personal prompt library is your competitive edge. Most people retype from scratch every time — you\'ll be 5× faster.' }
          }
        ]
      },
      advanced: {
        title: 'GPTs, Voice Mode & Power Workflows',
        description: 'Build custom GPTs, automate with the API, and integrate ChatGPT into your workflow.',
        duration: '30 min',
        steps: [
          {
            title: 'Build a custom GPT',
            content: `<p>Click <strong>Explore GPTs → Create</strong>. Use the builder to define:</p>
<ul>
  <li><strong>Name & personality</strong> — what it should act like</li>
  <li><strong>Instructions</strong> — detailed system prompt (e.g. "You are a social media assistant for a fitness brand...")</li>
  <li><strong>Knowledge</strong> — upload PDFs (your brand guide, FAQs, product catalogue)</li>
  <li><strong>Actions</strong> — connect to external APIs</li>
</ul>`,
            tip: { type: 'info', text: 'Publish your GPT privately for your team, or publicly on the GPT Store. Businesses use custom GPTs as internal AI assistants.' }
          },
          {
            title: 'Use Voice Mode for hands-free work',
            content: `<p>In the mobile app, tap the <strong>waveform icon</strong> to activate Advanced Voice Mode. You can have a full spoken conversation — ChatGPT listens, responds, and remembers context.</p>
<p>Use cases: brainstorming while walking, hands-free research while cooking, practising a presentation.</p>`,
            tip: { type: 'tip', text: 'Say "stop" or "pause" to interrupt ChatGPT mid-sentence. Say "what were we talking about?" to recover context.' }
          },
          {
            title: 'Connect the API for automation',
            content: `<p>Get your API key at <strong>platform.openai.com</strong>. Use it with Make.com or Zapier to create automations: "When I get an email inquiry, draft a personalised reply using ChatGPT and save to draft."</p>
<div class="code-box">Model: gpt-4o | Max tokens: 1000 | Temperature: 0.7</div>`,
            tip: { type: 'warning', text: 'API usage is billed per token. Set a monthly spending limit in your OpenAI account to avoid surprises.' }
          },
          {
            title: 'Use memory for persistent context',
            content: `<p>Go to <strong>Settings → Personalization → Memory</strong> and turn it on. ChatGPT will now remember facts across conversations: your job, preferences, ongoing projects.</p>
<p>You can also manually add memories: "Remember that I prefer metric units" or "Remember my client's name is Sarah and she runs a bakery."</p>`,
            tip: null
          },
          {
            title: 'Combine tools into a power workflow',
            content: `<p>Example power workflow for content creators:</p>
<ol>
  <li>Paste a YouTube transcript → ask for a blog post outline</li>
  <li>Expand each section in Canvas</li>
  <li>Upload the draft to GPT with SEO instructions → get meta description + title variants</li>
  <li>Export and publish</li>
</ol>
<p>Full article from transcript in under 15 minutes.</p>`,
            tip: { type: 'success', text: 'The gap between people who use AI casually and those who build systems around it is growing. You\'re now in the second group.' }
          }
        ]
      }
    }
  },

  /* ── Cursor ── */
  'cursor': {
    name: 'Cursor',
    domain: 'cursor.com',
    affiliate_url: '',
    category: 'Coding',
    tagline: 'AI-native code editor — ship faster with AI pair programming',
    color: '#6366f1',
    levels: {
      basic: {
        title: 'Set Up Cursor & Write AI-Assisted Code',
        description: 'From install to your first AI-generated feature in under 15 minutes.',
        duration: '15 min',
        steps: [
          {
            title: 'Download and install Cursor',
            content: `<p>Go to <strong>cursor.com</strong> and download for Mac, Windows, or Linux. Cursor is built on VS Code — if you use VS Code, your extensions, themes, and keybindings import automatically.</p>
<p>Sign in with GitHub or Google. The Hobby plan is free with 2,000 completions/month.</p>`,
            tip: { type: 'info', text: 'Import VS Code settings on first launch: Cursor → Settings → Import VS Code Settings. Done in one click.' }
          },
          {
            title: 'Open a project and explore the interface',
            content: `<p>Open any existing project or create a new folder. The Cursor interface looks like VS Code but adds:</p>
<ul>
  <li><strong>Tab</strong> key: accepts AI autocomplete suggestions (grey ghost text)</li>
  <li><strong>Cmd/Ctrl+K</strong>: inline edit — highlight code and ask AI to change it</li>
  <li><strong>Cmd/Ctrl+L</strong>: Chat panel — ask questions about your codebase</li>
  <li><strong>Cmd/Ctrl+I</strong>: Composer — multi-file AI editing</li>
</ul>`,
            tip: null
          },
          {
            title: 'Use Tab autocomplete',
            content: `<p>Start typing any function and watch Cursor predict the next lines in grey. Press <strong>Tab</strong> to accept. Press <strong>Escape</strong> to dismiss.</p>
<p>It's smarter than Copilot because it understands your entire codebase context — not just the current file.</p>`,
            tip: { type: 'tip', text: 'Tab suggestions get better the more code is in your project. For new files, give context by writing a comment describing what the file should do.' }
          },
          {
            title: 'Make your first Cmd+K inline edit',
            content: `<p>Highlight any block of code. Press <strong>Cmd+K</strong> (Mac) or <strong>Ctrl+K</strong> (Windows). A prompt bar appears — type what you want:</p>
<ul>
  <li>"Add error handling"</li>
  <li>"Convert to async/await"</li>
  <li>"Write a unit test for this function"</li>
  <li>"Add JSDoc comments"</li>
</ul>
<p>A diff preview shows changes. Accept with <strong>Enter</strong>, reject with <strong>Escape</strong>.</p>`,
            tip: { type: 'tip', text: 'If you don\'t highlight anything, Cmd+K generates new code at your cursor position based on surrounding context.' }
          },
          {
            title: 'Ask the Chat about your codebase',
            content: `<p>Press <strong>Cmd+L</strong> to open the Chat panel. Ask natural language questions:</p>
<ul>
  <li>"Where is the authentication logic?"</li>
  <li>"What does this file do?"</li>
  <li>"How do I add a new API route?"</li>
</ul>
<p>Cursor searches your entire codebase and gives accurate answers with file references.</p>`,
            tip: { type: 'success', text: 'You\'ve just turned a code editor into an AI pair programmer. Every task now has a second opinion.' }
          }
        ]
      },
      intermediate: {
        title: 'Composer, Rules & Context Management',
        description: 'Use multi-file editing and project rules to 10x your development speed.',
        duration: '25 min',
        steps: [
          {
            title: 'Use Composer for multi-file edits',
            content: `<p>Press <strong>Cmd+I</strong> to open Composer. This is Cursor's most powerful feature — describe a feature in plain English and Cursor creates or edits multiple files at once.</p>
<p>Example: "Add a dark mode toggle. Update the CSS variables, add a button to the nav, and persist the preference in localStorage."</p>
<p>Cursor shows a plan, then applies changes across all affected files with a diff you can review.</p>`,
            tip: { type: 'warning', text: 'Always review the diff before accepting. AI is fast but not infallible — scan each file change before committing.' }
          },
          {
            title: 'Add @ context to focus the AI',
            content: `<p>In Chat or Composer, type <strong>@</strong> to add specific context:</p>
<ul>
  <li><strong>@Files</strong> — reference a specific file</li>
  <li><strong>@Docs</strong> — attach official docs (React, Tailwind, etc.)</li>
  <li><strong>@Web</strong> — search the web for current info</li>
  <li><strong>@Codebase</strong> — search your entire project</li>
</ul>
<p>The more focused context you give, the more accurate the output.</p>`,
            tip: null
          },
          {
            title: 'Create a .cursorrules file',
            content: `<p>In the root of your project, create a file named <strong>.cursorrules</strong>. This is a plain text file that tells Cursor how to behave on this project:</p>
<div class="code-box">You are an expert Next.js 14 developer.
Use TypeScript for all new files.
Use Tailwind CSS for styling.
Follow the existing folder structure in /app.
Always add error boundaries around new components.</div>
<p>Every AI response in this project now follows your rules automatically.</p>`,
            tip: { type: 'tip', text: 'Find community .cursorrules templates at cursor.directory — copy and adapt rules from 1,000+ projects.' }
          },
          {
            title: 'Debug with AI chat',
            content: `<p>When you hit an error, paste it directly into Chat: "I\'m getting this error: [paste error]. Here\'s the relevant code: @filename"</p>
<p>Cursor traces through your actual code (not generic examples) and gives a specific fix. It often catches the root cause, not just the symptom.</p>`,
            tip: { type: 'tip', text: 'Say "explain why this happened" after the fix — understanding the root cause prevents the same error class in future code.' }
          },
          {
            title: 'Use Notepads for project context',
            content: `<p>Open <strong>Notepads</strong> (icon in left sidebar). Create a notepad called "Project Context" and paste in your tech stack, architecture decisions, API docs, and coding conventions.</p>
<p>Reference it in any prompt with <strong>@Notepad name</strong>. This gives every AI interaction full awareness of your project.</p>`,
            tip: { type: 'success', text: 'Teams that set up .cursorrules + Notepads ship features 3-5× faster because every developer — junior or senior — codes with the same expert context.' }
          }
        ]
      },
      advanced: {
        title: 'Agentic Workflows & Full Feature Builds',
        description: 'Let Cursor build entire features autonomously while you review and guide.',
        duration: '40 min',
        steps: [
          {
            title: 'Enable Agent mode in Composer',
            content: `<p>In Composer, switch from <em>Normal</em> to <strong>Agent</strong> mode (dropdown at the top). In Agent mode, Cursor can:</p>
<ul>
  <li>Run terminal commands autonomously</li>
  <li>Install packages</li>
  <li>Read error output and self-correct</li>
  <li>Create, edit, and delete files as needed</li>
</ul>
<p>Give it a high-level task: "Build a REST API endpoint for user authentication using JWT. Include registration, login, and refresh token routes."</p>`,
            tip: { type: 'warning', text: 'Agent mode can make sweeping changes. Work in a feature branch and commit frequently so you can roll back.' }
          },
          {
            title: 'Build a feature from a spec',
            content: `<p>Write a brief feature spec in a Notepad or comment, then point Agent at it:</p>
<div class="code-box">@spec.md Build the feature described here. Follow the existing patterns in @/app/api. Use @/types for all TypeScript types. Run tests after each major step.</div>
<p>Agent reads the spec, plans the implementation, builds it, runs tests, and iterates on failures.</p>`,
            tip: null
          },
          {
            title: 'Iterative review workflow',
            content: `<p>Never blindly accept large AI diffs. Use this review loop:</p>
<ol>
  <li>Agent generates changes → Review the diff file by file</li>
  <li>Accept good changes, reject bad ones</li>
  <li>Tell Agent: "The auth middleware looks good but the token refresh logic is wrong — [explain why]"</li>
  <li>Agent corrects and re-submits</li>
</ol>
<p>You're the architect; Agent is your fast junior dev.</p>`,
            tip: { type: 'tip', text: 'Add "explain your reasoning" to complex requests. Understanding the AI\'s approach helps you catch logical errors before they become bugs.' }
          },
          {
            title: 'Integrate external docs with @Docs',
            content: `<p>Go to <strong>Cursor Settings → Features → Docs</strong>. Add any library URL — Cursor crawls it and makes it searchable via <strong>@Docs</strong> in chat.</p>
<p>Example: add Stripe's API docs. Now ask: "Using @Stripe docs, write the webhook handler for payment_intent.succeeded" — Cursor generates accurate code from the latest docs, not its training data.</p>`,
            tip: { type: 'info', text: 'Custom docs are project-specific. Share your cursor.json with the team so everyone gets the same curated doc set.' }
          },
          {
            title: 'Build a full-stack feature end-to-end',
            content: `<p>The end game: give Agent a user story and let it build the full stack — DB schema → API routes → frontend components → tests → docs.</p>
<p>Example: "Feature: Users can upload a profile picture. Store in S3, display in the nav, and fall back to initials if no image." Then guide the review cycle until it ships.</p>`,
            tip: { type: 'success', text: 'Developers who master agentic workflows ship features in hours that used to take days. That\'s the real unlock with Cursor.' }
          }
        ]
      }
    }
  },

  /* ── Claude ── */
  'claude': {
    name: 'Claude',
    domain: 'claude.ai',
    affiliate_url: '',
    category: 'Chatbot',
    tagline: 'Anthropic\'s AI — exceptional at writing, reasoning and long documents',
    color: '#d97706',
    levels: {
      basic: {
        title: 'Getting Started with Claude',
        description: 'Discover what makes Claude different and nail your first conversations.',
        duration: '10 min',
        steps: [
          {
            title: 'Create your account',
            content: `<p>Go to <strong>claude.ai</strong> and sign up with Google or email. The free plan gives access to Claude Sonnet — fast, capable, and free with daily usage limits.</p>
<p>Claude Pro ($20/mo) unlocks Claude Opus (most intelligent), higher limits, and Projects.</p>`,
            tip: { type: 'info', text: 'Claude is made by Anthropic, an AI safety company. It\'s designed to be honest, harmless, and particularly good at nuanced, thoughtful responses.' }
          },
          {
            title: 'Understand Claude\'s strengths',
            content: `<p>Claude excels at tasks that require careful reasoning and high-quality writing:</p>
<ul>
  <li><strong>Long documents</strong> — can read and analyse up to 200,000 tokens (roughly 500 pages)</li>
  <li><strong>Nuanced writing</strong> — captures tone, voice, and style very accurately</li>
  <li><strong>Complex reasoning</strong> — breaks down multi-step problems clearly</li>
  <li><strong>Coding</strong> — strong at debugging, explanation, and code review</li>
</ul>`,
            tip: null
          },
          {
            title: 'Upload and analyse a long document',
            content: `<p>Click the <strong>paperclip icon</strong> and upload a PDF, Word doc, or paste text directly. Then ask:</p>
<ul>
  <li>"What are the 5 key arguments in this document?"</li>
  <li>"Find any factual inconsistencies"</li>
  <li>"Write an executive summary in 3 bullet points"</li>
</ul>
<p>Claude processes the entire document — not just a truncated excerpt — which matters for long contracts, research papers, or books.</p>`,
            tip: { type: 'tip', text: 'Try uploading a contract and asking "Flag any clauses that are unusually risky for the buyer." Claude catches nuance that keyword searches miss.' }
          },
          {
            title: 'Try Claude for writing',
            content: `<p>Claude produces exceptionally natural prose. Give it style guidance:</p>
<p><em>"Write a 200-word intro for my newsletter about productivity. Tone: conversational, not salesy. Start with a relatable observation, not a question."</em></p>
<p>Then refine: "Make the third sentence punchier" or "Add a specific example from the first bullet."</p>`,
            tip: { type: 'tip', text: 'Claude responds well to voice references: "Write this in the style of Paul Graham" or "Match the tone of the sample I paste below."' }
          },
          {
            title: 'Use the conversation to iterate',
            content: `<p>Unlike a search engine, Claude holds the full context of your conversation. You don't need to repeat yourself:</p>
<ul>
  <li>"Make it 20% shorter"</li>
  <li>"Change the audience — now write it for developers, not marketers"</li>
  <li>"Give me a completely different angle on the same topic"</li>
</ul>`,
            tip: { type: 'success', text: 'Claude\'s long context window means you can have deep, multi-step working sessions on a single complex task without losing thread.' }
          }
        ]
      },
      intermediate: {
        title: 'Projects, System Prompts & Deep Research',
        description: 'Build a personal AI workspace that knows your context and style.',
        duration: '20 min',
        steps: [
          {
            title: 'Create a Project',
            content: `<p>In the sidebar, click <strong>New Project</strong>. Projects give Claude persistent memory within that context — every new conversation in the project inherits the same instructions and uploaded documents.</p>
<p>Create projects for: "My Blog", "Client XYZ", "Product Research", "Writing Style."</p>`,
            tip: { type: 'info', text: 'Projects are available on Claude Pro and Team plans. On free, conversations reset each time — Projects are one of the most valuable Pro features.' }
          },
          {
            title: 'Write a Project system prompt',
            content: `<p>Inside a Project, click <strong>Edit project instructions</strong>. This is Claude's persistent briefing. Example for a content project:</p>
<div class="code-box">You are my content assistant for [Brand Name].
Brand voice: direct, warm, evidence-based. Never hype or superlatives.
Target audience: busy founders aged 30-50.
Always use British spelling.
Structure long pieces with clear H2 headings.
When I paste URLs, fetch and summarise them.</div>`,
            tip: { type: 'tip', text: 'The more specific your project instructions, the less you need to repeat yourself. Write them like briefing a new employee on day one.' }
          },
          {
            title: 'Upload reference documents to a Project',
            content: `<p>Inside a Project, click <strong>Add content</strong>. Upload your brand guide, past articles, style sheet, product FAQs, or any reference material.</p>
<p>Claude references these documents in every conversation within the project. Ask "Summarise our Q3 report" and it reads from the uploaded file.</p>`,
            tip: null
          },
          {
            title: 'Deep research with Claude',
            content: `<p>Claude is exceptional at synthesising complex information. For research tasks:</p>
<ol>
  <li>Paste multiple sources or documents</li>
  <li>Ask: "Compare the main arguments across these sources. Identify where they agree, where they conflict, and what's missing."</li>
  <li>Follow up: "Now write a balanced 500-word overview based on this analysis."</li>
</ol>`,
            tip: { type: 'warning', text: 'Claude\'s training data has a cutoff date. For current events or recent statistics, verify with a search engine after Claude provides the framework.' }
          },
          {
            title: 'Use Claude for code review',
            content: `<p>Paste any code block and ask for a review:</p>
<ul>
  <li>"Review this function for bugs, edge cases, and readability"</li>
  <li>"Is there a more efficient algorithm for this?"</li>
  <li>"What would break this if the input is null or very large?"</li>
</ul>
<p>Claude gives detailed explanations, not just corrected code — ideal for learning as you build.</p>`,
            tip: { type: 'success', text: 'The combo of long context + careful reasoning makes Claude particularly good at reviewing large codebases for architectural issues, not just syntax errors.' }
          }
        ]
      },
      advanced: {
        title: 'Claude API, Agentic Tasks & Advanced Workflows',
        description: 'Integrate Claude into products and automate complex multi-step tasks.',
        duration: '35 min',
        steps: [
          {
            title: 'Get your API key',
            content: `<p>Go to <strong>console.anthropic.com</strong>, create an account (separate from claude.ai), and generate an API key. Add credits to your account — usage is billed per token.</p>
<p>The API gives you access to Claude Haiku (fast/cheap), Sonnet (balanced), and Opus (most powerful).</p>`,
            tip: { type: 'info', text: 'Claude\'s API pricing is competitive with GPT-4. Haiku is extremely cheap for high-volume tasks like summarisation or classification.' }
          },
          {
            title: 'Write your first API call',
            content: `<p>A simple Python call:</p>
<div class="code-box">import anthropic
client = anthropic.Anthropic(api_key="your-key")
message = client.messages.create(
  model="claude-sonnet-4-5",
  max_tokens=1024,
  messages=[{"role": "user", "content": "Summarise this in 3 bullets: [text]"}]
)
print(message.content[0].text)</div>`,
            tip: { type: 'tip', text: 'Use the system parameter to set Claude\'s role and behaviour globally for the session, separate from the user message.' }
          },
          {
            title: 'Build a tool-use workflow',
            content: `<p>Claude can call external tools (APIs, databases) mid-conversation using <strong>Tool Use</strong> (Anthropic's function calling feature). Define your tools in the API call, and Claude decides when and how to use them.</p>
<p>Example: give Claude a "search_database" tool and a "send_email" tool. Ask it to "Find all overdue invoices and send reminder emails." It calls your tools autonomously.</p>`,
            tip: null
          },
          {
            title: 'Use extended thinking for hard problems',
            content: `<p>Enable <strong>extended thinking</strong> in the API to have Claude reason through a problem step by step before answering. Best for:</p>
<ul>
  <li>Complex mathematical problems</li>
  <li>Multi-step logical reasoning</li>
  <li>Strategy decisions with many variables</li>
</ul>
<div class="code-box">thinking={"type": "enabled", "budget_tokens": 10000}</div>`,
            tip: { type: 'warning', text: 'Extended thinking uses significantly more tokens. Reserve it for problems where depth genuinely matters — not routine tasks.' }
          },
          {
            title: 'Build a document processing pipeline',
            content: `<p>Real-world example: automated contract review pipeline.</p>
<ol>
  <li>New PDF contract arrives via email (Gmail trigger in Make.com)</li>
  <li>Make.com extracts text and sends to Claude API with your review instructions</li>
  <li>Claude flags risky clauses, missing sections, and key terms</li>
  <li>Summary sent back to you via Slack</li>
</ol>
<p>What took 30 minutes of legal review now takes 30 seconds per document.</p>`,
            tip: { type: 'success', text: 'Claude\'s 200K context window and precise instruction-following make it the strongest model for document-heavy automation pipelines.' }
          }
        ]
      }
    }
  },

  /* ── Midjourney ── */
  'midjourney': {
    name: 'Midjourney',
    domain: 'midjourney.com',
    affiliate_url: '',
    category: 'Image',
    tagline: 'State-of-the-art AI image generation with photoreal output',
    color: '#2563eb',
    levels: {
      basic: {
        title: 'Your First Midjourney Image',
        description: 'Generate stunning AI images on the Midjourney website in under 10 minutes.',
        duration: '10 min',
        steps: [
          {
            title: 'Create your account',
            content: `<p>Go to <strong>midjourney.com</strong> and click <em>Sign In</em> with Discord. Midjourney requires a paid plan — Basic starts at $10/month for ~200 images.</p>
<p>Once subscribed, you can generate directly on the website at <strong>midjourney.com/imagine</strong> — no Discord commands needed anymore.</p>`,
            tip: { type: 'info', text: 'Midjourney dropped the Discord-only requirement in 2024. The web interface is now the primary way to generate images.' }
          },
          {
            title: 'Write your first prompt',
            content: `<p>In the prompt box, describe what you want. Midjourney works best with descriptive, specific prompts:</p>
<p><strong>Weak:</strong> "a cat"<br><strong>Strong:</strong> "a fluffy orange tabby cat sitting on a wooden windowsill at golden hour, cozy interior background, soft bokeh, photorealistic"</p>
<p>Include: subject + setting + lighting + style + mood.</p>`,
            tip: null
          },
          {
            title: 'Understand the 4-image grid',
            content: `<p>Midjourney generates a 2×2 grid of 4 variations. Under the grid you'll see buttons:</p>
<ul>
  <li><strong>U1-U4</strong> (Upscale) — get a full high-res version of image 1, 2, 3, or 4</li>
  <li><strong>V1-V4</strong> (Variation) — generate 4 new variations based on that image</li>
  <li><strong>🔄</strong> — regenerate all 4 with the same prompt</li>
</ul>`,
            tip: { type: 'tip', text: 'U first, V second. Upscale the best one to see full detail, then use Variations to explore similar options if you want more choices.' }
          },
          {
            title: 'Add style keywords',
            content: `<p>Style keywords dramatically change the output. Try adding:</p>
<ul>
  <li><strong>Photography:</strong> DSLR, 35mm, Canon 5D, shallow depth of field</li>
  <li><strong>Illustration:</strong> flat design, vector art, watercolour, pencil sketch</li>
  <li><strong>Cinematic:</strong> film grain, anamorphic lens, movie still</li>
  <li><strong>Art style:</strong> oil painting, Studio Ghibli style, Art Nouveau</li>
</ul>`,
            tip: { type: 'tip', text: 'Add an artist name to imitate their style: "in the style of Monet" or "Greg Rutkowski lighting". Combine for unique hybrid aesthetics.' }
          },
          {
            title: 'Download and use your image',
            content: `<p>After upscaling (U1-U4), click the image to open it full size. Right-click → Save Image As, or use the download button.</p>
<p>Upscaled images are typically 1024×1024px or larger — suitable for most web and print uses.</p>`,
            tip: { type: 'success', text: 'Midjourney images can be used commercially on all paid plans. Check the licence terms at docs.midjourney.com for specifics.' }
          }
        ]
      },
      intermediate: {
        title: 'Parameters, Aspect Ratios & Style Control',
        description: 'Take creative control with Midjourney\'s powerful parameter system.',
        duration: '25 min',
        steps: [
          {
            title: 'Use aspect ratio and version parameters',
            content: `<p>Add parameters at the end of your prompt with <strong>--</strong>:</p>
<ul>
  <li><strong>--ar 16:9</strong> — widescreen (YouTube thumbnails, wallpapers)</li>
  <li><strong>--ar 9:16</strong> — portrait (Instagram Stories, TikTok)</li>
  <li><strong>--ar 1:1</strong> — square (Instagram posts)</li>
  <li><strong>--v 6</strong> — use Midjourney V6 (most photorealistic)</li>
</ul>
<div class="code-box">a neon-lit Tokyo street at night, rain reflections, cinematic --ar 16:9 --v 6</div>`,
            tip: null
          },
          {
            title: 'Control quality and stylisation',
            content: `<p>Two key parameters:</p>
<ul>
  <li><strong>--q 2</strong> — double quality (slower, more detail, uses 2× GPU time)</li>
  <li><strong>--s 0-1000</strong> — stylisation. Low (0-100): realistic, literal. High (700+): artistic, creative interpretation</li>
</ul>
<p>For product photography: <code>--s 50 --q 2</code>. For painterly art: <code>--s 800</code>.</p>`,
            tip: { type: 'tip', text: 'Start with --s 250 (default) and adjust from there. High stylisation can make prompts less literal — great for art, not for specific product shots.' }
          },
          {
            title: 'Use --no to exclude elements',
            content: `<p>The <strong>--no</strong> parameter removes things from the image:</p>
<div class="code-box">a serene forest path in autumn --no people, signs, buildings, cars</div>
<p>Useful when Midjourney keeps adding unwanted elements. You can list multiple things to exclude separated by commas.</p>`,
            tip: { type: 'tip', text: 'More effective than writing "without X" in the prompt. Negative parameters are processed separately and carry more weight.' }
          },
          {
            title: 'Seed for reproducible results',
            content: `<p>Every image has a <strong>seed number</strong> — a random value that determines the starting noise pattern. Find it by reacting to an image with ✉️ in Discord, or checking image info in the web interface.</p>
<p>Reuse a seed with a slightly different prompt to get consistent character appearance across images:</p>
<div class="code-box">portrait of a woman in a red dress --seed 1234
portrait of the same woman in a blue dress --seed 1234</div>`,
            tip: { type: 'warning', text: 'Seeds give approximate consistency, not exact. For true character consistency, use the newer Character Reference feature (--cref).' }
          },
          {
            title: 'Image prompting with --iw',
            content: `<p>Upload an image as part of your prompt to use it as a visual reference. Paste the image URL first, then your text prompt:</p>
<div class="code-box">[image URL] in this style but set in a sci-fi environment --iw 0.5</div>
<p><strong>--iw</strong> (image weight) from 0.1–2.0 controls how much the reference image influences the output. 0.5 = balanced influence.</p>`,
            tip: { type: 'success', text: 'Image prompting is the fastest way to match an existing visual style — product shots, brand aesthetics, architecture references.' }
          }
        ]
      },
      advanced: {
        title: 'Consistent Characters, Inpainting & Production Workflows',
        description: 'Create consistent characters and integrate Midjourney into a professional creative workflow.',
        duration: '40 min',
        steps: [
          {
            title: 'Character Reference (--cref)',
            content: `<p>The <strong>--cref</strong> parameter creates consistent character appearance across multiple images:</p>
<div class="code-box">portrait of Emma in a coffee shop --cref [URL of your character image] --cw 100</div>
<p><strong>--cw</strong> (character weight) controls how closely the character appearance is followed. 100 = strict, 0 = loose inspiration.</p>`,
            tip: { type: 'info', text: 'Create your character reference image first using a detailed character description, then use that output as --cref for all subsequent images.' }
          },
          {
            title: 'Style Reference (--sref)',
            content: `<p>Use <strong>--sref</strong> to lock in a visual style across a project — colour palette, texture, line quality:</p>
<div class="code-box">a mountain landscape --sref [URL of style reference] --sw 500</div>
<p>Create a brand visual kit by making one hero image and using it as --sref for all subsequent marketing assets. Instant brand consistency.</p>`,
            tip: null
          },
          {
            title: 'Use Vary (Region) for inpainting',
            content: `<p>Upscale an image, then click <strong>Vary (Region)</strong>. This lets you select a specific area of the image and regenerate just that part with a new prompt.</p>
<p>Use cases: fix an awkward hand, swap a background, change someone's clothing, add or remove objects.</p>`,
            tip: { type: 'tip', text: 'Inpainting works best when your selection has clean, clear edges. Feathery or complex boundaries can create visible seams.' }
          },
          {
            title: 'Integrate with the Midjourney API',
            content: `<p>Midjourney has an official API (in beta access). For unofficial automation, many creators use <strong>Replicate</strong> or wrap Midjourney via automation tools.</p>
<p>Production workflow: prompt spreadsheet → Make.com → Midjourney batch generation → auto-download to Google Drive → review queue in Notion.</p>`,
            tip: { type: 'warning', text: 'Third-party Midjourney automation tools violate the ToS. Use official API access (waitlist at midjourney.com) for production pipelines.' }
          },
          {
            title: 'Build a brand asset production system',
            content: `<p>Systematic brand image creation:</p>
<ol>
  <li>Create your character reference and style reference images</li>
  <li>Build a prompt template library: hero shots, social posts, blog headers</li>
  <li>Use --sref for style consistency across all templates</li>
  <li>Batch generate in Midjourney, organise by campaign in the web gallery</li>
  <li>Export and feed into Canva templates for final copy/layout</li>
</ol>`,
            tip: { type: 'success', text: 'A well-built Midjourney prompt library means your brand can produce consistent, on-brand AI images in minutes instead of commissioning design work.' }
          }
        ]
      }
    }
  },

  /* ── Gemini ── */
  'gemini': {
    name: 'Gemini',
    domain: 'gemini.google.com',
    affiliate_url: '',
    category: 'Chatbot',
    tagline: 'Google\'s multimodal AI with real-time web access across Workspace',
    color: '#1a73e8',
    levels: {
      basic: {
        title: 'Getting Started with Gemini',
        description: 'Set up Gemini and discover its unique strengths over other AI assistants.',
        duration: '10 min',
        steps: [
          {
            title: 'Access Gemini',
            content: `<p>Go to <strong>gemini.google.com</strong> and sign in with any Google account. Gemini is free with your Google account — Gemini Advanced ($19.99/month as part of Google One AI Premium) unlocks the most capable model and Workspace integration.</p>
<p>You can also access Gemini directly in Gmail, Docs, Sheets, and Slides with a Workspace account.</p>`,
            tip: { type: 'info', text: 'Gemini 2.0 Flash (free tier) is fast and capable for everyday tasks. Gemini 1.5 Pro and Ultra (Advanced) handle complex reasoning and very long documents.' }
          },
          {
            title: 'Try Gemini\'s real-time web access',
            content: `<p>Unlike ChatGPT free tier, Gemini can search the web for current information. Ask questions that require up-to-date data:</p>
<ul>
  <li>"What's the current price of Bitcoin?"</li>
  <li>"Summarise the news about [recent event]"</li>
  <li>"What are the latest features in iOS 18?"</li>
</ul>
<p>Gemini shows sources and cites where information came from.</p>`,
            tip: null
          },
          {
            title: 'Upload images for analysis',
            content: `<p>Gemini is truly multimodal — upload photos and ask questions about them:</p>
<ul>
  <li>Photo of a dish: "What's in this meal? Estimate calories."</li>
  <li>Screenshot of an error: "What does this error mean and how do I fix it?"</li>
  <li>Photo of a product: "What is this? Where can I buy it?"</li>
  <li>Handwritten notes: "Transcribe and summarise this"</li>
</ul>`,
            tip: { type: 'tip', text: 'Gemini can analyse up to multiple images in one conversation. Compare products, spot differences between designs, or analyse a series of photos.' }
          },
          {
            title: 'Connect Google services',
            content: `<p>Click the <strong>Connect apps</strong> button (puzzle piece icon) to give Gemini access to your Google services:</p>
<ul>
  <li><strong>Gmail</strong> — "Summarise my unread emails from this week"</li>
  <li><strong>Google Drive</strong> — "Find the Q3 report in my Drive and summarise it"</li>
  <li><strong>Google Calendar</strong> — "What do I have scheduled tomorrow?"</li>
</ul>`,
            tip: { type: 'warning', text: 'Connecting Google services allows Gemini to access your personal data. Review the permissions — you can revoke access at any time in your Google Account settings.' }
          },
          {
            title: 'Use Gems for custom AI assistants',
            content: `<p>Click <strong>Gems</strong> in the sidebar to create custom Gemini assistants with specific instructions and personalities — similar to ChatGPT\'s custom GPTs.</p>
<p>Create a "Writing Coach" Gem, a "Research Assistant" Gem, or a "Grammar Checker" Gem — each with its own system instructions.</p>`,
            tip: { type: 'success', text: 'Gems + Google Workspace integration = a personalised AI assistant embedded directly in your existing tools. This is Gemini\'s biggest advantage over standalone AI tools.' }
          }
        ]
      },
      intermediate: {
        title: 'Gemini in Google Workspace',
        description: 'Use Gemini\'s AI inside Gmail, Docs, Sheets and Slides to work faster.',
        duration: '20 min',
        steps: [
          {
            title: 'Gemini in Gmail',
            content: `<p>Open Gmail and click the <strong>Gemini icon</strong> (✦) in the compose window. You can:</p>
<ul>
  <li><strong>Help me write</strong> — describe an email, Gemini drafts it</li>
  <li><strong>Refine</strong> — make it shorter, more formal, more friendly</li>
  <li><strong>Summarise this email</strong> — get a 3-bullet summary of any message</li>
  <li><strong>Reply suggestions</strong> — one-click reply drafts</li>
</ul>`,
            tip: { type: 'tip', text: 'Use "Help me write" for routine emails (meeting requests, follow-ups, rejections). Even a rough Gemini draft is faster than starting from scratch.' }
          },
          {
            title: 'Gemini in Google Docs',
            content: `<p>In any Google Doc, click <strong>Help me write</strong> at the top, or use the Gemini sidebar. You can:</p>
<ul>
  <li>Generate a first draft from a brief</li>
  <li>Proofread and suggest improvements</li>
  <li>Ask questions about the document's content</li>
  <li>Rewrite selected sections in a different tone</li>
</ul>`,
            tip: null
          },
          {
            title: 'Gemini in Google Sheets',
            content: `<p>In Google Sheets, Gemini can:</p>
<ul>
  <li><strong>Explain data</strong> — "What trends do you see in this data?"</li>
  <li><strong>Write formulas</strong> — "Write a formula to calculate the 30-day rolling average of column B"</li>
  <li><strong>Generate data</strong> — "Create a table of the top 10 countries by GDP with their population"</li>
  <li><strong>Analyse and chart</strong> — "Create a chart showing sales by quarter"</li>
</ul>`,
            tip: { type: 'tip', text: 'For formula help, describe what you want in plain English. Gemini generates the correct Sheets formula even for complex multi-condition lookups.' }
          },
          {
            title: 'Use NotebookLM for deep document analysis',
            content: `<p><strong>NotebookLM</strong> (notebooklm.google.com) is a Gemini-powered research tool. Upload PDFs, Google Docs, YouTube videos, or paste text, then ask questions across all sources at once.</p>
<p>It generates a summary, creates an FAQ, identifies key themes, and lets you quiz it on the content — like having a research assistant who has read everything.</p>`,
            tip: { type: 'info', text: 'NotebookLM\'s "Audio Overview" feature creates a podcast-style audio summary of your documents — genuinely useful for long reports you want to absorb while commuting.' }
          },
          {
            title: 'Gemini Advanced for complex research',
            content: `<p>Gemini 1.5 Pro (Advanced) has a 1 million token context window — the longest of any AI. Upload entire codebases, lengthy legal documents, or books and ask questions across the full content.</p>
<p>Use "Deep Research" mode to have Gemini autonomously search the web across dozens of sources and produce a comprehensive research report.</p>`,
            tip: { type: 'success', text: 'Deep Research + NotebookLM together form the most powerful research workflow available in any AI suite right now.' }
          }
        ]
      },
      advanced: {
        title: 'Gemini API, Multimodal Workflows & Automation',
        description: 'Build applications and automate workflows using Gemini\'s API.',
        duration: '35 min',
        steps: [
          {
            title: 'Get access to the Gemini API',
            content: `<p>Go to <strong>aistudio.google.com</strong> (Google AI Studio) and generate an API key. Free tier is generous — 15 requests/minute at no cost.</p>
<p>AI Studio is also a great playground for testing prompts before building with the API — drag and drop files, test different models, and tune parameters.</p>`,
            tip: { type: 'info', text: 'For production applications with high volume, switch to the Vertex AI version of Gemini for enterprise-grade SLAs and fine-tuning capabilities.' }
          },
          {
            title: 'Make your first API call',
            content: `<p>Python example with the Gemini SDK:</p>
<div class="code-box">import google.generativeai as genai
genai.configure(api_key="YOUR_KEY")
model = genai.GenerativeModel("gemini-2.0-flash")
response = model.generate_content("Summarise AI trends in 2025")
print(response.text)</div>`,
            tip: null
          },
          {
            title: 'Use multimodal inputs in the API',
            content: `<p>Gemini natively handles text, images, audio, and video in the same API call:</p>
<div class="code-box">response = model.generate_content([
  "Describe what's happening in this image",
  PIL.Image.open("photo.jpg")
])</div>
<p>For video: upload to Google Drive and pass the file URI. Gemini can analyse full video files and describe content, transcribe dialogue, or answer questions about scenes.</p>`,
            tip: { type: 'tip', text: 'Gemini is the only major model that natively processes long video files (up to 1 hour). Huge for video production, compliance, and media analysis use cases.' }
          },
          {
            title: 'Build a Google Workspace automation',
            content: `<p>Using Apps Script (Google's built-in automation tool), you can connect Gemini to any Workspace app without leaving the Google ecosystem:</p>
<ul>
  <li>Auto-summarise incoming emails and add to a Sheet</li>
  <li>Generate a weekly report from Sheets data → create a Doc → email it</li>
  <li>Classify support tickets in Sheets using Gemini and route them</li>
</ul>`,
            tip: { type: 'warning', text: 'Apps Script runs server-side on Google\'s infrastructure. API quotas are shared across your Google account — check quotas before building high-volume automations.' }
          },
          {
            title: 'Implement a RAG pipeline with Gemini',
            content: `<p>Retrieval-Augmented Generation: combine your private knowledge base with Gemini's reasoning.</p>
<ol>
  <li>Store your documents in a vector database (Pinecone, ChromaDB)</li>
  <li>On each query, retrieve the most relevant document chunks</li>
  <li>Pass retrieved context + user question to Gemini API</li>
  <li>Gemini answers based on your own data, not just training data</li>
</ol>
<p>This is the architecture behind most production AI assistants.</p>`,
            tip: { type: 'success', text: 'Gemini\'s massive context window means you can often skip the retrieval step for smaller knowledge bases — just pass all your documents directly.' }
          }
        ]
      }
    }
  },

  /* ── Canva ── */
  'canva': {
    name: 'Canva',
    domain: 'canva.com',
    affiliate_url: '',
    category: 'Design',
    tagline: 'Design anything with AI — no design experience needed',
    color: '#7d2ae8',
    levels: {
      basic: {
        title: 'Create Your First Design with Canva',
        description: 'Go from blank canvas to polished design in under 15 minutes.',
        duration: '15 min',
        steps: [
          {
            title: 'Create your account',
            content: `<p>Go to <strong>canva.com</strong> and sign up free with Google, Facebook, or email. The free plan includes thousands of templates, basic elements, and 5GB storage.</p>
<p>Canva Pro ($15/month) unlocks the full AI suite (Magic Studio), brand kits, and 100M+ premium assets.</p>`,
            tip: { type: 'info', text: 'Students, teachers, and non-profits get Canva Pro free. Verify at canva.com/education or canva.com/nonprofits.' }
          },
          {
            title: 'Start from a template',
            content: `<p>On the Canva home page, click the design type you need: Social Post, Presentation, Poster, Flyer, Video, Logo, etc. Or type in the search bar: "Instagram post 2024" or "pitch deck".</p>
<p>Browse hundreds of templates filtered by style, colour, and industry. Click any template to open it in the editor.</p>`,
            tip: { type: 'tip', text: 'Filter templates by colour to match your brand. Click the colour filter and enter your brand\'s hex code to see templates in your palette.' }
          },
          {
            title: 'Edit text, images, and colours',
            content: `<p>In the editor:</p>
<ul>
  <li><strong>Text:</strong> Double-click any text box to edit. Change font, size, and colour from the top toolbar.</li>
  <li><strong>Images:</strong> Click an image to replace it. Drag your own photo from the <em>Uploads</em> panel, or search Canva's library.</li>
  <li><strong>Colours:</strong> Click any coloured element and use the colour picker. Paste a hex code for exact brand colours.</li>
</ul>`,
            tip: null
          },
          {
            title: 'Use Magic Studio AI tools',
            content: `<p>Click <strong>Apps → Magic Studio</strong> or look for the ✦ icon. Key AI tools:</p>
<ul>
  <li><strong>Magic Write</strong> — AI text generation in any text box</li>
  <li><strong>Background Remover</strong> — one-click background removal from any photo</li>
  <li><strong>Magic Eraser</strong> — paint over any object to remove it from a photo</li>
  <li><strong>Text to Image</strong> — generate any image from a description</li>
</ul>`,
            tip: { type: 'tip', text: 'Background Remover alone saves hours of Photoshop work. Upload any product photo and remove the background in one click — ready for any background.' }
          },
          {
            title: 'Download and share',
            content: `<p>Click <strong>Share → Download</strong>. Choose your format:</p>
<ul>
  <li><strong>PNG</strong> — best for images with transparent backgrounds</li>
  <li><strong>JPEG</strong> — best for photos, smaller file size</li>
  <li><strong>PDF Print</strong> — for printing (includes bleed marks)</li>
  <li><strong>MP4</strong> — for animated designs and videos</li>
</ul>
<p>Or click <strong>Share → Publish to social</strong> to post directly to connected accounts.</p>`,
            tip: { type: 'success', text: 'You just produced professional-quality design without a designer. Canva\'s template system means the hard layout work is already done — you just customise.' }
          }
        ]
      },
      intermediate: {
        title: 'Brand Kits, Magic Studio & Advanced AI Tools',
        description: 'Build a consistent brand identity and unlock Canva\'s full AI design suite.',
        duration: '25 min',
        steps: [
          {
            title: 'Set up your Brand Kit',
            content: `<p>Go to <strong>Brand Hub → Brand Kit</strong> (Pro feature). Upload your:</p>
<ul>
  <li><strong>Logo</strong> (PNG with transparent background)</li>
  <li><strong>Brand colours</strong> (add hex codes for primary, secondary, accent)</li>
  <li><strong>Brand fonts</strong> (upload custom fonts or select from Canva's library)</li>
</ul>
<p>Once set up, your brand colours and fonts appear in every design automatically.</p>`,
            tip: { type: 'info', text: 'Create multiple Brand Kits if you manage multiple clients or brands. Switch between them in the editor from the Brand section.' }
          },
          {
            title: 'Use Magic Design to generate from a photo',
            content: `<p>Click <strong>Create a design → Magic Design</strong>. Upload a photo (product, headshot, event) and describe what you need. Canva generates 8+ template options styled around your photo.</p>
<p>Pick a template, and all text placeholders are pre-populated with AI-written copy based on your brief.</p>`,
            tip: { type: 'tip', text: 'Magic Design is fastest for repeating content needs — event flyers, product announcements, social posts. The AI learns your preferred style over time.' }
          },
          {
            title: 'Magic Edit and Expand',
            content: `<p><strong>Magic Edit</strong>: Click any photo → Edit image → Magic Edit. Paint over any area and describe what to replace it with: "a bouquet of sunflowers" or "a laptop on the desk".</p>
<p><strong>Magic Expand</strong>: Extend a photo beyond its original edges. Great for making portrait photos landscape, or adding more background to a cropped shot.</p>`,
            tip: null
          },
          {
            title: 'Create a template for your team',
            content: `<p>Design a master template with your brand elements locked in: logo position, colour palette, font hierarchy. Then:</p>
<ol>
  <li>Click <strong>Share → Template link</strong></li>
  <li>Share the link — teammates open it and get an editable copy</li>
  <li>They customise the text and images; brand elements stay protected</li>
</ol>`,
            tip: { type: 'tip', text: 'Lock brand elements by right-clicking → Lock. Teammates can edit unlocked elements but can\'t accidentally move your logo or change brand colours.' }
          },
          {
            title: 'Use Bulk Create for content at scale',
            content: `<p>Go to <strong>Apps → Bulk Create</strong>. Upload a CSV with your data (names, dates, product names). Canva generates hundreds of personalised designs — certificates, social posts, personalised cards — in seconds.</p>
<p>Each row in your CSV becomes a unique design variation.</p>`,
            tip: { type: 'success', text: 'Bulk Create turns a 2-hour personalisation task into a 2-minute one. Perfect for event certificates, personalised ads, or merchandise mockups.' }
          }
        ]
      },
      advanced: {
        title: 'Canva for Teams, API & Production Workflows',
        description: 'Run professional design operations at scale using Canva\'s advanced features.',
        duration: '35 min',
        steps: [
          {
            title: 'Set up Canva for Teams',
            content: `<p>Upgrade to <strong>Canva for Teams</strong> to enable:</p>
<ul>
  <li>Shared Brand Kits accessible by the whole team</li>
  <li>Team folders with permission controls</li>
  <li>Design approval workflows</li>
  <li>Shared template libraries</li>
  <li>Admin controls for brand compliance</li>
</ul>`,
            tip: { type: 'info', text: 'Teams plans have per-seat pricing. For agencies: create one Canva for Teams account and invite clients as "External Members" with limited access to their folder only.' }
          },
          {
            title: 'Use Canva Connect API',
            content: `<p>The <strong>Canva Connect API</strong> lets you integrate Canva into your own applications or automate design creation programmatically.</p>
<p>Use cases: auto-generate event tickets from a database, create personalised social posts from CRM data, integrate design creation into your e-commerce platform.</p>
<p>Access at <strong>canva.dev</strong>.</p>`,
            tip: null
          },
          {
            title: 'Integrate with Make.com for automated design',
            content: `<p>Connect Canva to Make.com (no-code automation). Example workflow:</p>
<ol>
  <li>New Shopify order arrives</li>
  <li>Make.com triggers Canva API with order details</li>
  <li>Canva generates a personalised "Thank you" card using a template</li>
  <li>PDF saved to Google Drive and sent via email automatically</li>
</ol>`,
            tip: { type: 'tip', text: 'Combine Bulk Create + Make.com for the most powerful no-code design automation. Trigger bulk exports based on data from any connected app.' }
          },
          {
            title: 'Build a social media content system',
            content: `<p>Professional social content workflow with Canva:</p>
<ol>
  <li>Create a Content Calendar in Canva (they have a template)</li>
  <li>Build master templates for each post type: quote card, product shot, announcement</li>
  <li>Use Magic Write to draft copy for each post</li>
  <li>Connect to Buffer or Later via Canva's direct publishing integration</li>
  <li>Schedule all posts for the month in one session</li>
</ol>`,
            tip: null
          },
          {
            title: 'Create a video production workflow',
            content: `<p>Canva's video editor (often overlooked) handles:</p>
<ul>
  <li>Animated social content with auto-resize for all platforms</li>
  <li>Presentation recordings with your face in the corner</li>
  <li>Short-form video with captions and animations</li>
</ul>
<p>Use <strong>Magic Animate</strong> to auto-animate any static design into a video. Adjust animation style, speed, and timing without touching a timeline.</p>`,
            tip: { type: 'success', text: 'Canva has quietly become a full creative suite. Designers who master Canva\'s team and API features run entire design operations that used to require expensive agencies.' }
          }
        ]
      }
    }
  },

  /* ── DeepSeek ── */
  'deepseek': {
    name: 'DeepSeek',
    domain: 'chat.deepseek.com',
    affiliate_url: '',
    category: 'Chatbot',
    tagline: 'Powerful open-source AI — exceptional at coding and reasoning',
    color: '#4f46e5',
    levels: {
      basic: {
        title: 'Getting Started with DeepSeek',
        description: 'Discover DeepSeek\'s unique strengths in coding, math and reasoning.',
        duration: '10 min',
        steps: [
          {
            title: 'Access DeepSeek',
            content: `<p>Go to <strong>chat.deepseek.com</strong> and sign up with email or phone. DeepSeek is free to use on the web.</p>
<p>DeepSeek is an open-source Chinese AI model that rivals GPT-4 in many benchmarks — particularly in coding and mathematical reasoning — at a fraction of the cost.</p>`,
            tip: { type: 'info', text: 'DeepSeek\'s models are open-source. You can run them locally via Ollama for complete privacy and no usage limits. The web chat is the easiest way to start.' }
          },
          {
            title: 'Enable DeepThink (R1) mode',
            content: `<p>At the bottom of the chat interface, toggle <strong>DeepThink (R1)</strong> on. This activates DeepSeek's reasoning model, which shows its step-by-step thinking before answering.</p>
<p>R1 is exceptionally good at:</p>
<ul>
  <li>Complex mathematics and proofs</li>
  <li>Multi-step coding problems</li>
  <li>Logic puzzles and reasoning chains</li>
  <li>Scientific problem solving</li>
</ul>`,
            tip: { type: 'tip', text: 'DeepThink is slower but dramatically more accurate for hard problems. Use normal mode for quick tasks, DeepThink for anything requiring careful reasoning.' }
          },
          {
            title: 'Try a coding task',
            content: `<p>DeepSeek excels at code. Try:</p>
<ul>
  <li>"Write a Python function to parse a CSV and calculate the average of column 3"</li>
  <li>"Debug this JavaScript: [paste code]"</li>
  <li>"Explain what this SQL query does line by line: [paste query]"</li>
  <li>"Convert this Python function to TypeScript"</li>
</ul>
<p>The code output is usually ready to run with minimal editing.</p>`,
            tip: null
          },
          {
            title: 'Use it for research and analysis',
            content: `<p>DeepSeek handles analytical tasks well:</p>
<ul>
  <li>"Analyse the pros and cons of [decision] from multiple angles"</li>
  <li>"What are the key differences between [A] and [B]?"</li>
  <li>"Solve this: [math problem]" — shows full working</li>
</ul>`,
            tip: { type: 'warning', text: 'DeepSeek\'s training data has Chinese government censorship on some political topics. For those areas, use Claude or ChatGPT instead.' }
          },
          {
            title: 'Enable web search',
            content: `<p>Toggle <strong>Search</strong> at the bottom of the input box. DeepSeek will search the web and cite sources in its response — similar to Gemini and Perplexity.</p>
<p>Good for: current events, recent research papers, product comparisons, pricing information.</p>`,
            tip: { type: 'success', text: 'DeepSeek offers a genuinely impressive free tier. For coding and technical tasks especially, it often matches or exceeds more expensive commercial models.' }
          }
        ]
      },
      intermediate: {
        title: 'Advanced Prompting & Coding Workflows',
        description: 'Get the most out of DeepSeek for technical tasks and complex reasoning.',
        duration: '20 min',
        steps: [
          {
            title: 'Use DeepSeek for code review',
            content: `<p>Paste any codebase excerpt and ask for a thorough review:</p>
<div class="code-box">"Review this code. Identify:
1. Bugs and potential errors
2. Security vulnerabilities
3. Performance issues
4. Code style/readability improvements
Explain each issue and suggest a fix."</div>
<p>DeepSeek gives structured, actionable feedback with specific line references.</p>`,
            tip: null
          },
          {
            title: 'Solve complex algorithms with R1',
            content: `<p>For algorithm design problems, use DeepThink (R1) and provide full context:</p>
<div class="code-box">"I need an algorithm to find the shortest path between nodes in a weighted graph where some edges can be negative. My graph has up to 10,000 nodes. Recommend the best approach and implement it in Python."</div>
<p>Watch the reasoning steps — DeepSeek evaluates multiple approaches before choosing.</p>`,
            tip: { type: 'tip', text: 'Reading DeepSeek\'s reasoning chain teaches you how to think about algorithm problems systematically — genuinely valuable for developing programming instincts.' }
          },
          {
            title: 'Generate unit tests automatically',
            content: `<p>Paste a function or class and ask:</p>
<div class="code-box">"Write comprehensive unit tests for this function using [pytest/Jest/JUnit]. Cover: normal cases, edge cases, invalid inputs, and boundary conditions."</div>
<p>DeepSeek generates test files ready to run, with descriptive test names and assertions.</p>`,
            tip: { type: 'tip', text: 'Combine with "Explain each test" to understand what\'s being tested and why — useful for teams building test culture from scratch.' }
          },
          {
            title: 'Document code automatically',
            content: `<p>Paste any function, class, or module and ask:</p>
<ul>
  <li>"Write JSDoc/docstring comments for all functions"</li>
  <li>"Create a README for this project based on the code"</li>
  <li>"Generate API documentation for these endpoints"</li>
</ul>
<p>DeepSeek reads the code accurately and produces documentation that matches the actual behaviour.</p>`,
            tip: null
          },
          {
            title: 'Use for data science and maths',
            content: `<p>DeepSeek R1 is among the strongest models for mathematical reasoning. Use it for:</p>
<ul>
  <li>Statistical analysis explanations</li>
  <li>ML model architecture recommendations</li>
  <li>Data cleaning strategy for messy datasets</li>
  <li>Numpy/Pandas code for complex transformations</li>
</ul>`,
            tip: { type: 'success', text: 'For pure technical and coding tasks, DeepSeek R1 is arguably the best free option available. Bookmark it as your go-to coding assistant.' }
          }
        ]
      },
      advanced: {
        title: 'DeepSeek API & Local Deployment',
        description: 'Access DeepSeek\'s API and run models locally for full privacy and control.',
        duration: '35 min',
        steps: [
          {
            title: 'Get the DeepSeek API',
            content: `<p>Go to <strong>platform.deepseek.com</strong> and create an account. Generate an API key. DeepSeek's API is OpenAI-compatible — you can use the OpenAI SDK with DeepSeek's base URL.</p>
<div class="code-box">base_url="https://api.deepseek.com"
api_key="your-deepseek-key"
model="deepseek-chat" # or "deepseek-reasoner"</div>`,
            tip: { type: 'info', text: 'DeepSeek\'s API pricing is dramatically cheaper than OpenAI\'s. deepseek-chat costs ~$0.14/M input tokens vs GPT-4o\'s $2.50/M — roughly 18× cheaper.' }
          },
          {
            title: 'Run DeepSeek locally with Ollama',
            content: `<p>Install <strong>Ollama</strong> (ollama.com) — a tool for running LLMs locally. Then:</p>
<div class="code-box">ollama pull deepseek-r1:7b   # 7B parameter model
ollama run deepseek-r1:7b    # start chatting</div>
<p>The 7B model runs on most laptops with 8GB RAM. The 70B model needs a powerful GPU.</p>`,
            tip: { type: 'tip', text: 'Local DeepSeek means zero API costs and complete privacy — your prompts never leave your machine. Ideal for sensitive business data.' }
          },
          {
            title: 'Integrate with Open WebUI',
            content: `<p>Install <strong>Open WebUI</strong> (a ChatGPT-like interface for local models) to use DeepSeek locally with a clean interface. Supports multiple models, conversation history, and custom system prompts.</p>
<p>Connect via Ollama → Open WebUI → access via browser at localhost:3000.</p>`,
            tip: null
          },
          {
            title: 'Build a coding agent with the API',
            content: `<p>Using the OpenAI-compatible SDK with DeepSeek's endpoint:</p>
<div class="code-box">from openai import OpenAI
client = OpenAI(
  api_key="your-deepseek-key",
  base_url="https://api.deepseek.com"
)
# Use with tool calling for agentic coding tasks
response = client.chat.completions.create(
  model="deepseek-reasoner",
  messages=[{"role":"user","content":"Refactor this codebase..."}]
)</div>`,
            tip: { type: 'warning', text: 'DeepSeek\'s servers are in China. For compliance-sensitive use cases (healthcare, finance, legal), use local deployment via Ollama instead of the API.' }
          },
          {
            title: 'Fine-tuning for domain-specific use',
            content: `<p>DeepSeek's models are open-source, meaning you can fine-tune them on your own data. Use <strong>Unsloth</strong> or <strong>LLaMA Factory</strong> for efficient fine-tuning on consumer hardware.</p>
<p>Use case: fine-tune DeepSeek on your company's codebase to create a coding assistant that deeply understands your architecture and conventions.</p>`,
            tip: { type: 'success', text: 'Open-source + fine-tuning = a fully custom AI assistant that rivals commercial models but runs in your own infrastructure. This is the long-term advantage of open-source AI.' }
          }
        ]
      }
    }
  },

  /* ── CapCut AI ── */
  'capcut-ai': {
    name: 'CapCut AI',
    domain: 'capcut.com',
    affiliate_url: '',
    category: 'Video',
    tagline: 'Free AI video editor with auto-captions and viral templates',
    color: '#000000',
    levels: {
      basic: {
        title: 'Create Your First AI Video with CapCut',
        description: 'Edit and publish a polished video in under 20 minutes — zero experience needed.',
        duration: '20 min',
        steps: [
          {
            title: 'Download CapCut or use the web version',
            content: `<p>Download CapCut from the App Store (iOS), Google Play (Android), or use <strong>capcut.com</strong> in your browser. All versions are free.</p>
<p>Sign in with TikTok, Google, or email. CapCut is made by ByteDance (TikTok's parent company) and is deeply integrated with TikTok's content creation workflow.</p>`,
            tip: { type: 'info', text: 'The web version at capcut.com has more advanced AI features. For quick mobile edits, use the app. For serious content production, use the web editor.' }
          },
          {
            title: 'Import your footage',
            content: `<p>Click <strong>New Project</strong> → <strong>Import</strong>. Add your video clips, photos, or start from a template. CapCut accepts MP4, MOV, AVI, and most common formats.</p>
<p>The timeline at the bottom shows your clips in sequence. Drag to reorder, pinch to zoom.</p>`,
            tip: null
          },
          {
            title: 'Add auto-captions',
            content: `<p>This is CapCut's killer feature. Click <strong>Text → Auto Captions</strong>. CapCut transcribes your audio in seconds and adds perfectly timed, styled captions.</p>
<p>Choose from caption styles — animated, bold, minimalist. TikTok-style captions typically use large text with a coloured background word.</p>`,
            tip: { type: 'tip', text: 'Auto captions increase video watch time significantly — most people watch short videos with sound off. Never skip captions for social content.' }
          },
          {
            title: 'Use AI effects and enhancements',
            content: `<p>Under the <strong>AI</strong> tab:</p>
<ul>
  <li><strong>Auto reframe</strong> — automatically keeps the subject in frame when converting 16:9 to 9:16</li>
  <li><strong>Background remover</strong> — remove or replace backgrounds from any clip</li>
  <li><strong>Face enhancement</strong> — smooth skin, brighten eyes</li>
  <li><strong>Noise reduction</strong> — clean up ambient noise from audio</li>
</ul>`,
            tip: { type: 'tip', text: 'Auto Reframe saves enormous time when repurposing horizontal YouTube content for vertical TikTok/Reels. The AI tracks faces and keeps them centred.' }
          },
          {
            title: 'Export and publish',
            content: `<p>Click <strong>Export</strong> in the top right. For social media:</p>
<ul>
  <li><strong>Resolution:</strong> 1080p for TikTok/Reels, 4K for YouTube</li>
  <li><strong>Format:</strong> MP4</li>
  <li><strong>Frame rate:</strong> 30fps standard, 60fps for smooth motion</li>
</ul>
<p>Use the <strong>Share to TikTok</strong> button to publish directly from CapCut.</p>`,
            tip: { type: 'success', text: 'You just made a professional-quality video with AI assistance. CapCut removes the biggest friction in content creation — complex editing software.' }
          }
        ]
      },
      intermediate: {
        title: 'Templates, Script-to-Video & Viral Techniques',
        description: 'Use CapCut\'s AI to systematise viral content creation.',
        duration: '25 min',
        steps: [
          {
            title: 'Use Trending Templates',
            content: `<p>In the CapCut app, go to <strong>Templates</strong>. Browse trending templates — these are pre-edited video formats that are currently performing well on TikTok.</p>
<p>Pick a template, replace the clips with your own footage (CapCut shows you exactly which slot each clip goes in), and it auto-edits to match the template's music and transitions.</p>`,
            tip: { type: 'info', text: 'Trending templates work because the edit style is already optimised for the algorithm. Using a template that\'s already viral gives your content a head start.' }
          },
          {
            title: 'Script to Video',
            content: `<p>In the web editor at capcut.com, click <strong>Script to Video</strong>. Write or paste a script — CapCut AI automatically:</p>
<ul>
  <li>Splits the script into scenes</li>
  <li>Matches stock footage to each scene</li>
  <li>Adds voiceover (or uses your script for AI voice)</li>
  <li>Adds captions and music</li>
</ul>
<p>A full faceless video from a written script in under 5 minutes.</p>`,
            tip: { type: 'tip', text: 'For faceless content channels (news, facts, how-to), Script to Video is the most efficient production workflow available at any price.' }
          },
          {
            title: 'AI voice cloning and text-to-speech',
            content: `<p>Under <strong>Text → Text to Speech</strong>, choose from 300+ AI voices across 50+ languages. Or use <strong>Voice Cloning</strong> (Pro feature) to clone your own voice for hands-free narration.</p>
<p>Batch process: write your whole script in the text-to-speech editor, and every line gets AI narration automatically.</p>`,
            tip: null
          },
          {
            title: 'Use Dynamic captions and animations',
            content: `<p>Beyond standard captions, try:</p>
<ul>
  <li><strong>Karaoke captions</strong> — highlights each word as it's spoken</li>
  <li><strong>Emoji captions</strong> — adds relevant emojis to caption lines automatically</li>
  <li><strong>Word animations</strong> — each word pops in with an animation</li>
</ul>
<p>These styles are currently trending because they keep viewers watching and increase shares.</p>`,
            tip: { type: 'tip', text: 'Word-by-word animations (sometimes called "word pop" style) are consistently among the highest-engagement caption formats. Test them on your next 5 videos.' }
          },
          {
            title: 'A/B test hooks with multiple exports',
            content: `<p>The first 1-3 seconds (the "hook") determine 80% of your video's performance. Create 2-3 versions of your video with different opening shots, then:</p>
<ul>
  <li>Export each version</li>
  <li>Post all versions on different days</li>
  <li>Keep the hook style that gets highest average watch time</li>
</ul>`,
            tip: { type: 'success', text: 'Most creators post once and wonder why videos don\'t perform. Systematic hook testing is the single highest-leverage improvement for short-form video.' }
          }
        ]
      },
      advanced: {
        title: 'Viral Content Systems & CapCut Team Workflows',
        description: 'Build a content production machine with CapCut at the centre.',
        duration: '35 min',
        steps: [
          {
            title: 'Build a content repurposing pipeline',
            content: `<p>Turn one piece of long-form content into 10+ short clips:</p>
<ol>
  <li>Record or download a YouTube video / podcast</li>
  <li>Use CapCut's <strong>Auto Highlight</strong> — AI identifies the most engaging moments</li>
  <li>Each highlight becomes a short clip with auto-captions</li>
  <li>Apply a consistent caption style template</li>
  <li>Export all clips with one-click batch export</li>
</ol>`,
            tip: { type: 'info', text: 'Auto Highlight uses engagement signals (energy, volume spikes, keyword detection) to find your best moments. It\'s not perfect but dramatically reduces manual clipping time.' }
          },
          {
            title: 'Create a brand template library',
            content: `<p>Design your own reusable video templates in CapCut:</p>
<ul>
  <li>Set brand colours in the colour picker (save as custom palette)</li>
  <li>Set your brand font for captions</li>
  <li>Create an intro/outro animation with your logo</li>
  <li>Save as a draft template — duplicate for each new video</li>
</ul>
<p>Your videos immediately look cohesive even if made by different team members.</p>`,
            tip: null
          },
          {
            title: 'Use CapCut for Teams',
            content: `<p>CapCut for Business allows team collaboration — multiple editors working on shared projects with brand guidelines enforced. Set up:</p>
<ul>
  <li>Shared asset library (approved footage, music, graphics)</li>
  <li>Brand style guidelines (fonts, colours)</li>
  <li>Review and approval workflows</li>
</ul>`,
            tip: { type: 'tip', text: 'For agencies or marketing teams producing high video volume: CapCut for Teams + a shared footage library means any team member can produce on-brand content independently.' }
          },
          {
            title: 'Integrate CapCut into a full content stack',
            content: `<p>Professional content production stack:</p>
<ol>
  <li><strong>ChatGPT</strong> → write scripts and video titles</li>
  <li><strong>ElevenLabs</strong> → AI voiceover for each script</li>
  <li><strong>Midjourney</strong> → AI visuals for faceless videos</li>
  <li><strong>CapCut</strong> → assemble, caption, add music, export</li>
  <li><strong>Buffer/Later</strong> → schedule and publish across platforms</li>
</ol>
<p>Full faceless video pipeline — professional quality, no on-camera presence required.</p>`,
            tip: null
          },
          {
            title: 'Analyse performance and iterate',
            content: `<p>Connect your TikTok/Instagram analytics to identify patterns:</p>
<ul>
  <li>Which caption styles get highest completion rate?</li>
  <li>Which video lengths perform best for your audience?</li>
  <li>Which hook types drive most shares?</li>
</ul>
<p>Feed insights back into your CapCut templates. Iteration is the algorithm's reward signal — the creators who systematically improve their templates win consistently.</p>`,
            tip: { type: 'success', text: 'The creators dominating short-form video aren\'t luckier — they\'ve built systematic production and testing machines. CapCut is the engine. You\'ve now got the blueprint.' }
          }
        ]
      }
    }
  },

  /* ── Runway ── */
  'runway': {
    name: 'Runway',
    domain: 'runwayml.com',
    affiliate_url: '',
    category: 'Video',
    tagline: 'AI video generation and editing — Gen-3, motion brush and inpainting',
    color: '#7c3aed',
    levels: {
      basic: {
        title: 'Generate Your First AI Video with Runway',
        description: 'Create stunning AI-generated video clips in under 10 minutes.',
        duration: '10 min',
        steps: [
          {
            title: 'Create your account',
            content: `<p>Go to <strong>runwayml.com</strong> and sign up with Google or email. Free accounts get 125 credits (~25 seconds of video). Standard plan starts at $15/month for 625 credits.</p>
<p>You'll land on the Runway workspace — a browser-based creative suite with multiple AI tools.</p>`,
            tip: { type: 'info', text: 'Runway Gen-3 Alpha (their latest model) produces significantly more cinematic results than Gen-2. Make sure you\'re using Gen-3 for your first experiments.' }
          },
          {
            title: 'Generate a video from text (Text to Video)',
            content: `<p>Click <strong>Text to Video</strong> in the sidebar. In the prompt box, describe your scene:</p>
<p><em>"A lone astronaut walking on Mars at sunset, red dust swirling, cinematic wide shot, epic lighting"</em></p>
<p>Click <strong>Generate</strong>. In 60-90 seconds you'll get a 4-second video clip.</p>`,
            tip: { type: 'tip', text: 'Start with short, clear scene descriptions. Add camera movement terms: "slow zoom in", "aerial shot", "dolly forward". These dramatically improve results.' }
          },
          {
            title: 'Generate video from an image (Image to Video)',
            content: `<p>Click <strong>Image to Video</strong>. Upload any image — a photo, an AI image from Midjourney, or even a sketch. Add a prompt describing how the image should move:</p>
<p><em>"Camera slowly pans right, clouds move across sky, gentle breeze in the trees"</em></p>
<p>Runway animates your static image into a living scene.</p>`,
            tip: { type: 'tip', text: 'Image to Video tends to produce more controlled results than Text to Video because the visual starting point is defined. Use Midjourney to create the perfect frame, then animate it with Runway.' }
          },
          {
            title: 'Use camera controls',
            content: `<p>In Gen-3, click <strong>Advanced Options → Camera Controls</strong>. Set specific camera movements:</p>
<ul>
  <li><strong>Pan</strong> — horizontal camera movement</li>
  <li><strong>Tilt</strong> — up/down camera movement</li>
  <li><strong>Zoom</strong> — push in/pull back</li>
  <li><strong>Roll</strong> — rotating camera</li>
</ul>
<p>Combine movements: slow zoom + pan right = a cinematic reveal.</p>`,
            tip: null
          },
          {
            title: 'Download your video',
            content: `<p>After generation, click <strong>Download</strong> to save the MP4. Clips are typically 4-10 seconds depending on your selected duration.</p>
<p>Chain multiple clips together in CapCut or any video editor for longer sequences. Each clip becomes one scene in a storyboard.</p>`,
            tip: { type: 'success', text: 'You just created footage that would have required a film crew and location. For short-form content, product visualisations, and creative projects, Runway is a game-changer.' }
          }
        ]
      },
      intermediate: {
        title: 'Motion Brush, Inpainting & Extend Clip',
        description: 'Take creative control with Runway\'s advanced editing AI tools.',
        duration: '25 min',
        steps: [
          {
            title: 'Use Motion Brush for selective animation',
            content: `<p>In <strong>Image to Video</strong>, click <strong>Motion Brush</strong> before generating. Paint over specific areas of your image and set their motion direction separately:</p>
<ul>
  <li>Paint the sky → set gentle drift to the right</li>
  <li>Paint water → set ripple motion</li>
  <li>Paint a person → set a walking forward direction</li>
</ul>
<p>Each painted region gets independent motion control.</p>`,
            tip: { type: 'tip', text: 'Motion Brush gives you director-level control. The most cinematic results often come from moving the background subtly while keeping the subject still (or vice versa).' }
          },
          {
            title: 'Use Inpainting to edit existing video',
            content: `<p>Open any video in Runway's <strong>Inpainting</strong> tool. Draw a mask over any object you want to remove — a logo, person, watermark, or unwanted element. Runway fills it in seamlessly.</p>
<p>Also use inpainting to <em>add</em> elements: mask a blank wall and describe what should appear there.</p>`,
            tip: { type: 'warning', text: 'Inpainting works best on static or slow-moving areas. Fast-moving objects or complex textures (grass, crowds) are harder to inpaint convincingly across frames.' }
          },
          {
            title: 'Extend clips with AI',
            content: `<p>Select any generated clip and click <strong>Extend Clip</strong>. Runway continues the video scene using AI, adding another 4 seconds that match the movement, lighting, and style of the original.</p>
<p>You can extend multiple times to build longer sequences — though quality may degrade after 3-4 extensions.</p>`,
            tip: null
          },
          {
            title: 'Use Act-One for character animation',
            content: `<p><strong>Act-One</strong> transfers facial expressions and movements from a real actor's video to an AI character. Record yourself (or use stock footage) as the performance reference, upload a character image, and Runway maps the performance onto the character.</p>
<p>Use for: animated brand mascots, game characters, explainer video avatars.</p>`,
            tip: { type: 'info', text: 'Act-One is one of the few AI tools that preserves the nuance of human performance. The emotional expression carries through — subtle smiles, eyebrow raises, natural head movements.' }
          },
          {
            title: 'Lip sync with Runway',
            content: `<p>Use <strong>Lip Sync</strong> to match an AI character's lip movements to a voiceover. Upload your character video + audio file, and Runway syncs the lips precisely.</p>
<p>Workflow: Midjourney portrait → animate with Image to Video → lip sync with ElevenLabs AI voice → a fully voiced AI spokesperson.</p>`,
            tip: { type: 'success', text: 'Midjourney + Runway + ElevenLabs = a complete AI video production stack. A single creator can now produce content that would have required a production studio.' }
          }
        ]
      },
      advanced: {
        title: 'Production Pipelines, API & Consistent Characters',
        description: 'Build scalable AI video production workflows for professional output.',
        duration: '40 min',
        steps: [
          {
            title: 'Create a consistent character system',
            content: `<p>Consistent characters across multiple scenes require a systematic approach:</p>
<ol>
  <li>Create your character in Midjourney with detailed physical descriptions</li>
  <li>Generate 10+ reference images in different poses/angles using --cref</li>
  <li>Use the best reference image as input for every Runway Image to Video generation</li>
  <li>Keep camera movements subtle to minimise character drift</li>
</ol>`,
            tip: { type: 'tip', text: 'Write your character description as a saved prompt: age, hair, clothing, lighting. Paste it consistently across all Midjourney and Runway prompts to maintain visual consistency.' }
          },
          {
            title: 'Use the Runway API',
            content: `<p>Access the Runway API at <strong>docs.dev.runwayml.com</strong>. Generate video programmatically:</p>
<div class="code-box">import runwayml
client = runwayml.RunwayML()
task = client.image_to_video.create(
  model='gen3a_turbo',
  prompt_image=image_url,
  prompt_text='Camera slowly zooms in',
  duration=5
)</div>`,
            tip: { type: 'info', text: 'Runway\'s API enables batch video generation — useful for e-commerce product animations, real estate virtual tours, or personalised video at scale.' }
          },
          {
            title: 'Build a storyboard-to-video pipeline',
            content: `<p>Professional short film pipeline:</p>
<ol>
  <li>Write scene descriptions in a spreadsheet (location, action, camera, mood)</li>
  <li>Generate Midjourney frames for each scene</li>
  <li>Animate each frame with Runway Image to Video</li>
  <li>Assemble all clips in CapCut or Premiere</li>
  <li>Add ElevenLabs voiceover and music</li>
</ol>
<p>A 60-second narrative film in a day instead of a week of production.</p>`,
            tip: null
          },
          {
            title: 'Colour grade with AI-assisted tools',
            content: `<p>Runway includes a colour grading suite. Upload your final assembled video and use:</p>
<ul>
  <li><strong>Match Colour</strong> — match the colour grade of a reference film or image</li>
  <li><strong>Stylise</strong> — apply cinematic colour grades (Teal & Orange, Bleach Bypass, etc.)</li>
  <li><strong>Manual LUT upload</strong> — apply your own or purchased LUT files</li>
</ul>`,
            tip: { type: 'tip', text: 'Colour consistency across scenes is what separates amateur and professional-looking AI video. Run all your clips through the same colour grade before final export.' }
          },
          {
            title: 'Package and deliver client projects',
            content: `<p>For agency or freelance work with Runway:</p>
<ul>
  <li>Use Runway's <strong>Assets</strong> panel to organise clips by project</li>
  <li>Export final video at 4K for maximum quality (downscale at delivery)</li>
  <li>Share via Runway's built-in link sharing for client review</li>
  <li>Collect feedback on specific timestamps in the review link</li>
</ul>`,
            tip: { type: 'success', text: 'AI video production is the most underpenetrated creative service right now. Agencies using Runway deliver in 20% of the traditional timeline — that\'s a structural competitive advantage.' }
          }
        ]
      }
    }
  },

  /* ── Khan Academy AI ── */
  'khan-academy-ai': {
    name: 'Khan Academy AI',
    domain: 'khanacademy.org',
    affiliate_url: '',
    category: 'Education',
    tagline: 'Khanmigo — AI tutor for students and teaching assistant for educators',
    color: '#14866d',
    levels: {
      basic: {
        title: 'Getting Started with Khanmigo',
        description: 'Use Khan Academy\'s AI tutor to learn any subject faster and smarter.',
        duration: '10 min',
        steps: [
          {
            title: 'Access Khanmigo',
            content: `<p>Go to <strong>khanacademy.org</strong> and create a free account. Khanmigo (the AI tutor) is available to students via Khan Academy's platform. In the US, it's available as a paid add-on ($4/month for students, free for teachers via the teacher dashboard).</p>
<p>Look for the Khanmigo icon (the owl) in the bottom right of any exercise page.</p>`,
            tip: { type: 'info', text: 'Khanmigo is designed to never give you the answer directly. Instead it guides you to figure it out — which builds genuine understanding rather than dependence.' }
          },
          {
            title: 'Start a tutoring session',
            content: `<p>Click the Khanmigo icon while working on any Khan Academy exercise. Type your question or confusion:</p>
<ul>
  <li>"I don't understand how to set up this equation"</li>
  <li>"Can you explain what integration means?"</li>
  <li>"Why did I get this wrong?"</li>
</ul>
<p>Khanmigo responds with guiding questions rather than direct answers — this is intentional and highly effective for learning.</p>`,
            tip: { type: 'tip', text: 'If you\'re frustrated by Khanmigo not giving the answer: that\'s the point. Ask "Can you give me a hint?" to get a nudge in the right direction without the full solution.' }
          },
          {
            title: 'Use it across all subjects',
            content: `<p>Khanmigo works across Khan Academy's entire curriculum:</p>
<ul>
  <li><strong>Maths</strong> — from arithmetic through calculus and linear algebra</li>
  <li><strong>Science</strong> — biology, chemistry, physics, computing</li>
  <li><strong>Humanities</strong> — history, grammar, writing</li>
  <li><strong>Test prep</strong> — SAT, GMAT, LSAT practice</li>
</ul>
<p>Ask Khanmigo to explain any concept on the page, regardless of your current level.</p>`,
            tip: null
          },
          {
            title: 'Practise writing with Khanmigo',
            content: `<p>Khanmigo can review essays and writing assignments. Paste your draft and ask:</p>
<ul>
  <li>"What's the weakest part of my argument?"</li>
  <li>"Is my thesis clear?"</li>
  <li>"How could my introduction be stronger?"</li>
</ul>
<p>It provides feedback like a writing teacher — pointing to specific passages and asking questions that prompt you to improve them.</p>`,
            tip: { type: 'tip', text: 'Ask Khanmigo to roleplay as a character from a book you\'re studying. Talking to "Atticus Finch" or "Napoleon" about their decisions deepens literary and historical understanding.' }
          },
          {
            title: 'Use the Tutor Me feature for free-form learning',
            content: `<p>Outside of specific exercises, click <strong>Tutor Me</strong> in Khanmigo to start a free-form learning conversation. Tell it:</p>
<ul>
  <li>What subject you're studying</li>
  <li>What you already understand</li>
  <li>What specifically confuses you</li>
</ul>
<p>Khanmigo designs a mini lesson just for you, asking questions to check understanding as it goes.</p>`,
            tip: { type: 'success', text: 'A patient, personalised tutor available 24/7 who never gets frustrated and adapts to exactly your level of understanding. That\'s Khanmigo — and it\'s genuinely unlike any other AI tool.' }
          }
        ]
      },
      intermediate: {
        title: 'Deep Learning, Exam Prep & Student Workflows',
        description: 'Use Khanmigo strategically to master difficult material and prepare for exams.',
        duration: '20 min',
        steps: [
          {
            title: 'Use Socratic questioning to understand concepts deeply',
            content: `<p>When you encounter a concept you've memorised but don't truly understand, ask Khanmigo:</p>
<ul>
  <li>"Why does this rule exist? What would happen if it didn't?"</li>
  <li>"Can you give me a real-world example where this matters?"</li>
  <li>"What's the intuition behind this formula?"</li>
</ul>
<p>Going beyond "what" to "why" is where deep learning happens — and Khanmigo is designed for exactly this.</p>`,
            tip: null
          },
          {
            title: 'SAT and standardised test prep',
            content: `<p>Khan Academy has the official free SAT prep partnership with College Board. Use Khanmigo alongside practice tests:</p>
<ol>
  <li>Take a practice test on Khan Academy</li>
  <li>Review each wrong answer with Khanmigo: "Why did I get this wrong?"</li>
  <li>Ask Khanmigo to generate similar questions until the concept sticks</li>
  <li>Track your weak areas using Khan Academy's skill recommendations</li>
</ol>`,
            tip: { type: 'tip', text: 'Students who use Khan Academy\'s official SAT prep for 20+ hours improve their score by an average of 115 points. Adding Khanmigo for explanations accelerates this significantly.' }
          },
          {
            title: 'Create personalised practice problems',
            content: `<p>Ask Khanmigo to generate custom practice problems at exactly your level:</p>
<p><em>"I understand linear equations with one variable. Create 5 practice problems that are slightly more challenging, focusing on word problems."</em></p>
<p>Khanmigo designs targeted problems and walks you through each one as you solve it.</p>`,
            tip: { type: 'info', text: 'Spaced repetition is the most effective study technique. After each Khanmigo session, note which concepts still feel shaky and come back to those first next time.' }
          },
          {
            title: 'Debate and discuss ideas',
            content: `<p>For history and social studies, use Khanmigo's debate feature:</p>
<p>Ask it to argue the opposite position from what you believe about a historical event or policy. This forces you to encounter counterarguments and strengthens your critical thinking.</p>
<p>Example: "Argue that the French Revolution had more negative than positive effects."</p>`,
            tip: { type: 'tip', text: 'Teachers: Khanmigo debates are a great homework format. Assign students to debate a topic with Khanmigo and submit the transcript as their argument analysis.' }
          },
          {
            title: 'Use Khan Academy alongside other learning resources',
            content: `<p>Khan Academy works best as your practice and explanation layer. Pair it with:</p>
<ul>
  <li><strong>YouTube / 3Blue1Brown</strong> — visual explanations of maths concepts</li>
  <li><strong>Anki</strong> — flashcards for memorisation (facts, vocabulary, formulas)</li>
  <li><strong>Khan Academy exercises</strong> — immediate Khanmigo support while practising</li>
</ul>
<p>Khanmigo bridges the gap between passive video watching and active problem solving.</p>`,
            tip: { type: 'success', text: 'The students who improve fastest combine: quality explanations (videos) + active practice (exercises) + immediate feedback (Khanmigo). That learning loop compounds rapidly.' }
          }
        ]
      },
      advanced: {
        title: 'Khanmigo for Teachers & Educational Programme Design',
        description: 'Use Khanmigo to enhance teaching, personalise instruction, and save planning time.',
        duration: '30 min',
        steps: [
          {
            title: 'Set up a teacher account',
            content: `<p>Go to <strong>khanacademy.org/teacher</strong> and create a teacher account. Teachers get Khanmigo free in the US. Create a class, add your students, and you get a dashboard showing each student's progress, time spent, and skill mastery.</p>
<p>You can see exactly which students are struggling with which skills — without them having to raise their hand.</p>`,
            tip: { type: 'info', text: 'Khan Academy\'s teacher dashboard is one of the most detailed free formative assessment tools available. Pair it with Khanmigo for a complete personalised learning system.' }
          },
          {
            title: 'Use Khanmigo for lesson planning',
            content: `<p>Teachers can use Khanmigo directly to assist with planning:</p>
<ul>
  <li>"Create a lesson plan for introducing quadratic equations to 9th grade students"</li>
  <li>"Design a discussion activity about the causes of World War I for Year 10"</li>
  <li>"Generate 10 differentiated problems on fractions for students working at three different levels"</li>
</ul>`,
            tip: null
          },
          {
            title: 'Create writing feedback prompts',
            content: `<p>Design Khanmigo prompts that help students self-edit before submission:</p>
<p><em>"Ask Khanmigo: 'Review my essay introduction. Does it clearly state my thesis? What would make it stronger?'"</em></p>
<p>When students get Khanmigo feedback before submitting, the quality of work teachers receive improves dramatically — and students arrive with more specific questions.</p>`,
            tip: { type: 'tip', text: 'Assign Khanmigo conversation transcripts as part of the homework submission. You can see exactly how students reasoned through problems and where Khanmigo helped them.' }
          },
          {
            title: 'Assign targeted practice by skill gap',
            content: `<p>Use the teacher dashboard to identify class-wide skill gaps (e.g. 60% of students scoring below mastery on "solving systems of equations"). Then:</p>
<ol>
  <li>Assign the relevant Khan Academy skill as homework</li>
  <li>Students use Khanmigo during practice for immediate support</li>
  <li>Review the next class focusing on the remaining confusion</li>
</ol>
<p>Data-driven instruction at zero cost.</p>`,
            tip: { type: 'info', text: 'Khan Academy\'s research shows classes that use the platform for 30+ minutes/week as supplemental practice see measurably better test outcomes. The key is consistent use, not intensive cramming.' }
          },
          {
            title: 'Design a Khanmigo-enhanced curriculum unit',
            content: `<p>A full unit design using Khanmigo as an integral tool:</p>
<ol>
  <li><strong>Introduce</strong>: Teacher-led lesson with visuals and examples</li>
  <li><strong>Practice</strong>: Khan Academy exercises with Khanmigo support available</li>
  <li><strong>Deepen</strong>: Khanmigo Socratic discussions on the "why" behind concepts</li>
  <li><strong>Apply</strong>: Project with Khanmigo as a thinking partner</li>
  <li><strong>Assess</strong>: Traditional test — the formative assessment was already done by the dashboard</li>
</ol>`,
            tip: { type: 'success', text: 'The teachers using Khanmigo most effectively spend less time re-explaining basics (Khanmigo handles it) and more time on high-level discussions and project-based learning. That\'s the leverage.' }
          }
        ]
      }
    }
  }


  /* ── RankMath AI ── */
  'rankmath-ai': {
    name: "RankMath AI",
    domain: "",
    affiliate_url: "https://rankmath.com/?ref=benjie-6423",
    category: "SEO",
    tagline: "AI-powered WordPress SEO plugin with smart optimization",
    color: "#1A73E8",
    levels: {
      basic:       {
        title: "Your First SEO Optimization with RankMath AI",
        description: "Install RankMath and optimize your first blog post for search engines in minutes.",
        duration: "5 min",
        steps: [
          {
            title: "Install and Activate RankMath",
            content: `<p>Log into your WordPress dashboard and navigate to <strong>Plugins → Add New</strong>. Search for <strong>Rank Math SEO</strong> in the search bar. Click <strong>Install Now</strong>, then <strong>Activate</strong> once the installation completes.</p><p>You'll be redirected to the RankMath setup wizard. Click <strong>Start Wizard</strong> to begin the configuration process.</p>`,
            tip: { type: "info", text: "RankMath offers both free and Pro versions. The free version includes AI features like Content AI, but with usage limits." }
          },
          {
            title: "Complete the Setup Wizard",
            content: `<p>Follow the setup wizard through each screen. Connect your site by logging in with your Google account when prompted (this enables Google Search Console integration). Select <strong>Easy</strong> mode for simplified configuration.</p><p>Choose your site type (blog, business, personal, etc.) and enable <strong>Content AI</strong> when asked. This activates RankMath's AI-powered optimization features. Complete the wizard and click <strong>Finish</strong>.</p>`,
            tip: null
          },
          {
            title: "Open a Post and Access the SEO Panel",
            content: `<p>Navigate to <strong>Posts → All Posts</strong> and either create a new post or edit an existing one. Scroll down below the content editor to find the <strong>Rank Math SEO</strong> meta box.</p><p>In the SEO panel, you'll see tabs for <strong>General</strong>, <strong>Advanced</strong>, and <strong>Schema</strong>. The General tab displays your SEO score (0-100) and actionable recommendations.</p>`,
            tip: { type: "tip", text: "Aim for an SEO score above 80. Green checkmarks indicate completed optimizations, while yellow and red items need attention." }
          },
          {
            title: "Add Your Focus Keyword",
            content: `<p>In the <strong>Focus Keyword</strong> field at the top of the RankMath panel, enter your target keyword or phrase. Press Enter to confirm. RankMath will immediately analyze your content and update the SEO score.</p><p>Review the list of recommendations that appears. Common suggestions include adding the keyword to your title, headings, meta description, and first paragraph. Each recommendation shows whether it's satisfied (green check) or needs work (yellow or red icon).</p>`,
            tip: { type: "info", text: "You can add up to 5 focus keywords in the free version, allowing you to optimize for multiple related terms." }
          },
          {
            title: "Use Content AI for Optimization Suggestions",
            content: `<p>Click the <strong>Content AI</strong> button in the RankMath toolbar (looks like a brain icon). A sidebar will open showing AI-powered recommendations including related keywords, questions people ask, and content gaps.</p><p>Review the <strong>Recommended Keywords</strong> section and click the plus icon next to relevant terms to add them to your content strategy. The AI analyzes top-ranking pages for your focus keyword and suggests improvements. Update your content based on these insights, and watch your SEO score improve in real-time.</p>`,
            tip: { type: "success", text: "Content AI suggestions are based on actual SERP analysis, giving you competitive intelligence on what's working for top-ranking pages." }
          }
        ]
      },
      intermediate:       {
        title: "Advanced Content Optimization with AI Analysis",
        description: "Master RankMath's AI features to outrank competitors with data-driven content strategy.",
        duration: "15 min",
        steps: [
          {
            title: "Configure Advanced Content AI Settings",
            content: `<p>Navigate to <strong>Rank Math → General Settings → Content AI</strong> in your WordPress dashboard. Here you can adjust AI analysis preferences and connect your account for additional credits.</p><p>Under <strong>Content AI Settings</strong>, enable <strong>Auto-refresh suggestions</strong> to get real-time keyword recommendations as you write. Set your preferred <strong>Country</strong> and <strong>Language</strong> for localized SERP analysis. Click <strong>Save Changes</strong> to apply your configuration.</p>`,
            tip: { type: "tip", text: "Free users get 750 Content AI credits monthly. Each analysis costs 25 credits, so use them strategically on your most important content." }
          },
          {
            title: "Analyze Competitor Content Gaps",
            content: `<p>Open a post and launch <strong>Content AI</strong> from the RankMath panel. After entering your focus keyword, scroll to the <strong>Top 10 SERP Competitors</strong> section. Click <strong>Analyze</strong> to see detailed metrics for each ranking page.</p><p>Review the <strong>Word Count</strong>, <strong>Headings Used</strong>, and <strong>Content Structure</strong> of top performers. Click on individual competitors to see their exact keyword usage and heading hierarchy. Use this intelligence to structure your content more competitively than current top rankers.</p>`,
            tip: { type: "info", text: "The SERP preview shows real-time ranking data. If you notice competitors with lower domain authority ranking well, it signals a keyword opportunity." }
          },
          {
            title: "Implement Schema Markup for Rich Snippets",
            content: `<p>In the RankMath SEO panel, click the <strong>Schema</strong> tab. Click <strong>Add Schema</strong> and select the appropriate schema type for your content (Article, Review, Recipe, FAQ, How-To, etc.).</p><p>Fill in the required fields marked with red asterisks. For articles, enter <strong>Headline</strong>, <strong>Author</strong>, and <strong>Publisher</strong> information. For reviews, add <strong>Rating</strong> and <strong>Review Count</strong>. RankMath auto-populates many fields from your post data, but verify accuracy before publishing.</p><p>Click <strong>Update</strong> to save. Use the <strong>Schema Preview</strong> button to validate your markup before it goes live.</p>`,
            tip: { type: "success", text: "Proper schema markup can earn rich snippets in search results, dramatically improving click-through rates from Google." }
          },
          {
            title: "Optimize for Featured Snippets",
            content: `<p>In the Content AI panel, locate the <strong>People Also Ask</strong> section. These are questions Google shows for your target keyword. Click the expand icon next to each question to see current featured snippet content.</p><p>Add a dedicated section to your content answering 3-5 of these questions. Use <strong>H2</strong> or <strong>H3</strong> headings formatted as questions, followed by concise 40-60 word answers in paragraph form. For list-based snippets, use <strong>numbered lists</strong> or <strong>bulleted lists</strong> with clear, actionable items.</p><p>RankMath will highlight when your content matches featured snippet formats. Look for green checkmarks next to snippet optimization recommendations.</p>`,
            tip: { type: "tip", text: "Featured snippets favor content that directly answers questions in the first 1-2 sentences, followed by supporting details." }
          },
          {
            title: "Set Up Automated SEO Testing",
            content: `<p>Navigate to <strong>Rank Math → SEO Analysis</strong> to run a comprehensive site audit. Click <strong>Start SEO Analysis</strong> to scan your site for technical issues, broken links, and optimization opportunities.</p><p>Review the results organized by severity: <strong>Critical</strong>, <strong>Warning</strong>, and <strong>Suggestions</strong>. Click <strong>View Details</strong> on any issue to see affected pages and recommended fixes. Enable <strong>Email Notifications</strong> in <strong>Rank Math → General Settings → Email Reports</strong> to receive weekly SEO health summaries.</p><p>Set up <strong>Rank Tracking</strong> by navigating to <strong>Rank Math → Rank Tracker</strong>, adding your focus keywords, and monitoring position changes over time.</p>`,
            tip: { type: "warning", text: "SEO Analysis in the free version is limited. For automated monitoring and alerts, consider upgrading to RankMath Pro." }
          }
        ]
      },
      advanced:       {
        title: "API Integration and Bulk SEO Automation",
        description: "Automate SEO workflows at scale using RankMath's API and bulk optimization tools.",
        duration: "30 min",
        steps: [
          {
            title: "Enable and Configure the RankMath API",
            content: `<p>Navigate to <strong>Rank Math → General Settings → API</strong> in your WordPress dashboard. Toggle <strong>Enable REST API</strong> to activate API access. Copy your <strong>API Key</strong> from the field below (you may need to generate one first).</p><p>Under <strong>API Permissions</strong>, configure which data endpoints are accessible. Enable <strong>Read Posts</strong>, <strong>Update Posts</strong>, and <strong>Analytics Data</strong> for full automation capabilities. Set <strong>Rate Limiting</strong> to prevent API abuse (recommended: 100 requests per hour for development).</p><p>Test the connection by making a GET request to <div class="code-box">https://yoursite.com/wp-json/rankmath/v1/posts</div> with your API key in the Authorization header.</p>`,
            tip: { type: "warning", text: "Protect your API key like a password. Never commit it to public repositories or share it in client-side code." }
          },
          {
            title: "Bulk Update SEO Metadata via Script",
            content: `<p>Create a Python or Node.js script to bulk update meta titles and descriptions across multiple posts. Use the RankMath API endpoint <div class="code-box">/wp-json/rankmath/v1/updateMeta</div> with POST requests containing post IDs and new meta values.</p><p>Structure your request payload with fields for <strong>post_id</strong>, <strong>title</strong>, <strong>description</strong>, and <strong>focus_keywords</strong>. Loop through a CSV file of posts and their optimized metadata. Include error handling to log failed updates and retry logic for rate-limited requests.</p><p>Before running on production, test on a staging environment. Use the <strong>Dry Run</strong> parameter to preview changes without committing them. Monitor the response codes: 200 indicates success, 429 means rate limit exceeded, and 401 signals authentication issues.</p>`,
            tip: { type: "tip", text: "Use RankMath's Content AI API endpoint to generate optimized meta descriptions programmatically based on post content and focus keywords." }
          },
          {
            title: "Integrate Analytics with Google Data Studio",
            content: `<p>Navigate to <strong>Rank Math → Analytics</strong> and ensure Google Search Console is connected. Click <strong>Settings</strong> and enable <strong>Advanced Analytics</strong> to track keyword positions, CTR, and impressions.</p><p>Export your analytics data by clicking <strong>Export</strong> and selecting <strong>CSV</strong> or use the API endpoint <div class="code-box">/wp-json/rankmath/v1/analytics/keywords</div> to fetch JSON data programmatically. Set up a scheduled script (using cron or GitHub Actions) to pull this data daily.</p><p>In Google Data Studio, create a new data source using <strong>Google Sheets</strong> or <strong>BigQuery</strong> as the connector. Import your RankMath analytics exports and build custom dashboards showing SEO performance trends, top-performing keywords, and content ROI.</p>`,
            tip: { type: "info", text: "Combine RankMath analytics with Google Analytics 4 data for a complete picture of how SEO traffic converts on your site." }
          },
          {
            title: "Automate Schema Updates with Custom Post Types",
            content: `<p>For sites with custom post types (products, events, courses), automate schema generation using RankMath's filter hooks. In your theme's <strong>functions.php</strong> or a custom plugin, use the filter <div class="code-box">rank_math/json_ld</div> to programmatically add schema markup.</p><p>Create a function that checks the post type and adds appropriate schema. For WooCommerce products, inject <strong>Product</strong> schema with price, availability, and review data. For events, add <strong>Event</strong> schema with start date, location, and performer details pulled from custom fields.</p><p>Register your schema function with <div class="code-box">add_filter('rank_math/json_ld', 'your_custom_schema_function', 99, 2)</div>. The function receives the existing schema array and post object as parameters. Merge your custom schema and return the modified array. Test with Google's Rich Results Test tool.</p>`,
            tip: { type: "success", text: "Automated schema ensures consistency across hundreds or thousands of posts, eliminating manual entry and reducing errors." }
          },
          {
            title: "Build a Content Optimization Pipeline",
            content: `<p>Set up a GitHub Actions workflow or Jenkins pipeline that automatically optimizes content before publishing. Configure your CI/CD to trigger on pull requests to your content repository.</p><p>In your pipeline, use the RankMath API to analyze draft content and generate optimization reports. Create a script that extracts markdown or HTML from your CMS, sends it to <div class="code-box">/wp-json/rankmath/v1/analyzeContent</div> with target keywords, and receives SEO scores and recommendations.</p><p>Parse the API response and automatically add inline comments or annotations to the pull request showing missing keywords, readability issues, and schema opportunities. Set quality gates: require an SEO score above 70 before allowing merge to production.</p><p>For final automation, trigger post-publish tasks that submit URLs to Google Search Console for indexing and send Slack notifications with the content's SEO health metrics to your marketing team.</p>`,
            tip: { type: "tip", text: "Integrate RankMath's Content AI API in your editorial workflow to suggest optimizations before writers finish drafts, saving revision time." }
          }
        ]
      }
    }
  },

}; // end TUTORIALS_DATA
