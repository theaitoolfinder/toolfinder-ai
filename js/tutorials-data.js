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
            tip: { type: 'warning', text: 'ElevenLabs requires you to confirm the voice is yours. Cloning another person's voice without consent violates their Terms of Service.' }
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
            tip: { type: 'warning', text: 'Don't stuff keywords. Use them naturally in context — Google's NLP can tell the difference.' }
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
            tip: { type: 'info', text: 'Internal linking is one of the most overlooked on-page SEO tactics. Don't skip this step.' }
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
            tip: { type: 'tip', text: 'Always give attendees a heads-up that the meeting is being recorded. It's both polite and legally required in many regions.' }
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
  }

}; // end TUTORIALS_DATA
