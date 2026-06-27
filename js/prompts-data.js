/**
 * prompts-data.js
 * Sample Prompt templates for ToolFinder AI
 * Structure: PROMPT_CATEGORY_BANK + PROMPT_TOOL_OVERRIDES
 * 3 free prompts + 30 premium (9 beginner + 12 intermediate + 9 advanced) per category
 */

/* ============================================================
   TRENDING VIRAL PROMPTS — Updated weekly
   Top 10 most shared AI prompts on Instagram, TikTok, Facebook
   Last updated: June 27, 2026 · Next update: July 4, 2026
   ============================================================ */
window.TRENDING_PROMPTS = [
  {
    rank: 1,
    title: "Chibi Doll Photo Generator",
    tag: "🔥 #1 Trending",
    platforms: ["Instagram","TikTok","Facebook"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "4.1M+",
    trendScore: 99,
    category: "Image Generation",
    tip: "Upload a clear front-facing photo for best likeness results.",
    prompt: `Transform the person in this photo into an adorable 3D chibi collectible doll. The doll should have oversized round eyes that match the subject's eye colour, a tiny button nose, plump rosy cheeks, and a small wide smile. Recreate their exact hairstyle, hair colour, and outfit in miniature doll form with soft fabric textures. Style it as a premium limited-edition vinyl art toy displayed on a clean white surface with soft studio lighting and a subtle drop shadow. The doll should be roughly 12 cm tall with a smooth matte finish and fine painted details. Keep the subject's facial identity and characteristic features clearly recognisable.`
  },
  {
    rank: 2,
    title: "Claymation / Pixar Character",
    tag: "🔥 Viral",
    platforms: ["Instagram","TikTok","Facebook"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "2.9M+",
    trendScore: 98,
    category: "Image Generation",
    tip: "Ask it to keep your signature features — glasses, hairstyle, freckles — for the best result.",
    prompt: `Transform the person in this photo into a 3D claymation-style character in the aesthetic of a Pixar animated film. The figure should have smooth clay-like skin with subtle fingerprint texture, expressive oversized eyes with glossy catchlights, a slightly enlarged round head, and softly exaggerated proportions. Recreate their exact hairstyle, facial features, and outfit faithfully but with that warm, tactile clay quality. Place them against a clean soft-focus background with warm studio lighting that gives a gentle depth-of-field effect. The overall look should feel like a high-quality still from an animated feature film — charming, colourful, and full of personality.`
  },
  {
    rank: 3,
    title: "80s High School Yearbook",
    tag: "🔥 Viral",
    platforms: ["Instagram","TikTok","Facebook"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "2.2M+",
    trendScore: 97,
    category: "Photo Editing",
    tip: "Works on any modern photo — the more contemporary the original, the funnier the transformation.",
    prompt: `Transform this photo into an authentic 1985 American high school yearbook portrait. Apply the signature look of 1980s studio photography: warm amber-toned lighting with a soft gradient background fading from deep blue to lighter teal or warm brown. Add slight overexposure on the face, period-accurate hair styling (big permed waves, feathered layers, or a side-swept mall bangs look that fits the subject), and dress them in era-appropriate fashion — polo shirt, blazer with shoulder pads, or a colourful knit jumper. Give the image a slight film softness with minor chromatic aberration. Add a small nameplate caption bar at the bottom in a retro serif font: "[Name] · Class of '85". The result should look genuinely pulled from a printed yearbook page.`
  },
  {
    rank: 4,
    title: "Action Figure Blister Pack",
    tag: "🎯 Still Hot",
    platforms: ["Instagram","TikTok"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "1.9M+",
    trendScore: 95,
    category: "Image Generation",
    tip: "Mention 3–4 real accessories the person uses (laptop, coffee, camera) for a personalised result.",
    prompt: `Transform the person in this photo into a limited-edition collectible action figure displayed inside a sealed blister pack. The figure should be a hyper-realistic miniature of the subject wearing their exact outfit. Include 3–5 mini accessories that reflect their personality or profession inside separate plastic compartments. The cardboard backing should have a bold retro toy-brand logo, the character's name in large blocky font, a star rating graphic, and a tag line like "Limited Edition Series 1". Style it as a premium product photograph with dramatic studio lighting on a gradient background. Make the plastic clamshell look authentically transparent with slight reflections.`
  },
  {
    rank: 5,
    title: "Ancient Roman Marble Bust",
    tag: "🏛️ Trending",
    platforms: ["Instagram","Pinterest","Facebook"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "1.6M+",
    trendScore: 93,
    category: "Illustrated / Art",
    tip: "Use a neutral expression photo for the most dramatic classical sculpture effect.",
    prompt: `Transform this portrait into a photorealistic ancient Roman marble bust sculpture. Render the person's face and neck as finely carved Carrara marble — pure white with subtle grey veining, a smooth polished finish on the skin surfaces, and slightly rougher texture on the hair and clothing folds. The facial features should be faithfully reproduced in classical sculpture style: idealized proportions, almond-shaped eyes with no iris detail (solid marble), strong defined brow, and composed neutral expression. Place the bust on a matching marble pedestal with a simple carved inscription plinth. Dramatic museum-style directional lighting casts sharp shadows that accentuate the sculpture's depth. Background: dark grey-black museum gallery. Add a subtle depth-of-field blur on the background.`
  },
  {
    rank: 6,
    title: "Studio Ghibli Portrait",
    tag: "🎨 Still Hot",
    platforms: ["Instagram","Pinterest","Facebook"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "3.1M+",
    trendScore: 91,
    category: "Illustrated / Art",
    tip: "Add a specific Ghibli film for a more targeted style (e.g. 'in the style of Spirited Away').",
    prompt: `Reimagine the person in this photo as a Studio Ghibli animated character in the style of Hayao Miyazaki. Transform their appearance into a hand-painted watercolour illustration with soft rounded features, expressive large eyes with a warm glimmer, and natural blush tones. Place them in a lush, magical Ghibli landscape — rolling green hills, a countryside town, or a sky full of soft white clouds. Use the signature Ghibli colour palette: warm ochres, dusty greens, sky blues, and soft pinks. Add small whimsical details in the background — a tiny spirit, floating lanterns, or wildflowers. Keep the subject's hair colour and key facial features recognisable. 2D animation cel style with visible brushstroke texture.`
  },
  {
    rank: 7,
    title: "Vogue Magazine Cover",
    tag: "📸 Trending",
    platforms: ["Instagram","Facebook","TikTok"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "1.1M+",
    trendScore: 88,
    category: "Photo Editing",
    tip: "Use a high-quality portrait photo with good lighting. A simple background gives the cleanest result.",
    prompt: `Transform this photo into a high-fashion Vogue magazine cover. Place the subject as the lead cover model with professional editorial retouching — smooth luminous skin, refined colour grade in the signature Vogue aesthetic (rich, saturated but refined tones). Overlay the bold VOGUE masthead in white serif capitals at the top. Add a cover date line ("July 2026 · The Power Issue"), three teasing cover lines in clean white typography on the sides, a barcode in the lower right corner, and the magazine price. The overall composition should feel like a genuine luxury fashion magazine — high-end, aspirational, and immaculately styled. Lighting: dramatic single-source editorial light with crisp shadows.`
  },
  {
    rank: 8,
    title: "Emotion Sticker Pack",
    tag: "😂 Popular",
    platforms: ["Instagram","Facebook","WhatsApp"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "1.8M+",
    trendScore: 85,
    category: "Sticker / Chibi",
    tip: "Works best with a clear portrait photo. Share the sheet as a collage post.",
    prompt: `Convert the person in this photo into a set of 16 chibi emotion stickers arranged in a 4×4 grid on a clean white background. Each sticker should show the same character with a distinct emotion: 1-laughing hard, 2-crying tears of joy, 3-angry with steam, 4-shocked open mouth, 5-thinking with finger on chin, 6-sleepy with heavy eyelids, 7-blowing a kiss, 8-winking, 9-blushing, 10-celebrating with arms up, 11-confused with question mark, 12-cool with sunglasses, 13-scared hiding behind hands, 14-sulking with crossed arms, 15-star-struck eyes, 16-heart eyes. Bold black outlines, pastel background per sticker, chibi proportions with large head and small body, flat illustration style suitable for messaging apps.`
  },
  {
    rank: 9,
    title: "Miniature Diorama World",
    tag: "✨ Rising Fast",
    platforms: ["Instagram","TikTok","Pinterest"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "870K+",
    trendScore: 83,
    category: "Image Generation",
    tip: "Describe a meaningful place — your home city, favourite café, or dream destination — for a personal result.",
    prompt: `Create a photorealistic tilt-shift miniature diorama scene featuring a tiny version of the person from this photo living inside a beautifully crafted miniature world. The subject should appear approximately 3–4 cm tall, placed inside a small glass dome or an open cardboard diorama box. Design a miniature environment that reflects their personality or profession — a tiny cosy bedroom, a miniature city street, a mini forest clearing, or a small beach scene. Use extreme tilt-shift photography technique with heavy top and bottom blur to sell the miniature illusion. Warm ambient lighting, hyper-detailed tiny props (furniture, plants, tiny books), and a shallow depth of field. The overall aesthetic should feel magical, whimsical, and incredibly detailed — like a handcrafted art installation.`
  },
  {
    rank: 10,
    title: "Neon Holographic Portrait",
    tag: "💜 Rising",
    platforms: ["Instagram","TikTok"],
    tool: "ChatGPT",
    toolDomain: "chat.openai.com",
    shares: "620K+",
    trendScore: 80,
    category: "Photo Editing",
    tip: "Works best with a dark original photo — or ask it to place you against a black background first.",
    prompt: `Transform this portrait into a futuristic neon holographic artwork. Apply a vivid chromatic split where the subject's face and body glow with layered neon colours — electric violet, hot pink, cyan, and gold — as if projected as a hologram. Add RGB colour fringing and chromatic aberration around the edges. Create a glitch art effect with horizontal scan-line distortions across parts of the image. The skin should have a translucent luminous quality as if made of pure light. Layer subtle grid lines or digital rain (Matrix-style) in the background. Add lens flare streaks from the brightest neon points. Overall colour grade: deep black background, hyper-saturated neons, high contrast. The result should feel like a high-budget sci-fi film poster.`
  }
];

window.PROMPT_CATEGORY_BANK = {

  /* ============================================================
     CHATBOT
     ============================================================ */
  "Chatbot": {
    free: [
      {
        title: "Customer FAQ Bot",
        useCase: "Customer Support",
        prompt: "You are a helpful customer support assistant for [COMPANY NAME]. Answer questions about [PRODUCT/SERVICE] clearly and concisely. If you don't know the answer, politely say so and offer to escalate to a human agent. Always end with: 'Is there anything else I can help you with?'"
      },
      {
        title: "Personal Study Buddy",
        useCase: "Education",
        prompt: "Act as my personal tutor for [SUBJECT]. I am a [BEGINNER/INTERMEDIATE/ADVANCED] learner. Explain concepts in simple terms, give real-world examples, and after each explanation ask me a quick quiz question to test my understanding. Start by asking what specific topic I want to learn today."
      },
      {
        title: "Brainstorm Partner",
        useCase: "Creativity & Ideation",
        prompt: "Be my creative brainstorming partner. When I give you a problem or topic, generate 10 diverse and unconventional ideas. For each idea, give it a catchy name, a one-sentence description, and one potential challenge. My topic today is: [YOUR TOPIC]."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Simple Q&A Bot",
        useCase: "Basic Interactions",
        level: "beginner",
        prompt: "Answer questions about [TOPIC] in simple, friendly language. Keep answers under 3 sentences. If the question is unclear, ask for clarification before answering."
      },
      {
        title: "Daily Motivator",
        useCase: "Personal Development",
        level: "beginner",
        prompt: "Every morning, give me a motivational quote related to [GOAL/THEME], followed by one small actionable tip I can do today to make progress. Keep it upbeat and under 100 words."
      },
      {
        title: "Recipe Suggester",
        useCase: "Lifestyle",
        level: "beginner",
        prompt: "Suggest a simple recipe using these ingredients I have: [LIST INGREDIENTS]. The recipe should take under 30 minutes, require no special equipment, and be suitable for a [BEGINNER COOK/FAMILY WITH KIDS/SOLO DINER]."
      },
      {
        title: "Word of the Day Bot",
        useCase: "Language Learning",
        level: "beginner",
        prompt: "Give me one new [LANGUAGE] word each session. Include: the word, its pronunciation, its meaning in English, and use it in two example sentences — one simple and one more complex."
      },
      {
        title: "Joke Generator",
        useCase: "Entertainment",
        level: "beginner",
        prompt: "Tell me a clean, funny joke about [TOPIC]. After the punchline, briefly explain why it's funny (in case I don't get it). Then ask if I want another joke or a different topic."
      },
      {
        title: "Travel Tip Bot",
        useCase: "Travel",
        level: "beginner",
        prompt: "I'm planning to visit [DESTINATION]. Give me 5 essential tips a first-time visitor should know, covering: local customs, must-try food, safety, best time to visit, and one hidden gem most tourists miss."
      },
      {
        title: "Mood Check-In",
        useCase: "Wellness",
        level: "beginner",
        prompt: "Ask me how I'm feeling today. Based on my response, offer a brief, empathetic reply and suggest one simple self-care activity suited to my current mood. Keep your tone warm and non-judgmental."
      },
      {
        title: "Simple Budget Helper",
        useCase: "Personal Finance",
        level: "beginner",
        prompt: "Help me track my spending. I'll tell you my purchases for the day in a simple list format. Categorize each item (food, transport, entertainment, etc.), total them up, and tell me if I'm on track for a [DAILY BUDGET AMOUNT] daily budget."
      },
      {
        title: "Book Recommender",
        useCase: "Reading",
        level: "beginner",
        prompt: "Recommend 3 books for someone who enjoys [GENRE/TOPIC] and has about [X HOURS] per week to read. For each book, give the title, author, a 2-sentence summary, and why someone who likes [GENRE/TOPIC] would love it."
      },
      // INTERMEDIATE (12)
      {
        title: "Onboarding Assistant",
        useCase: "HR & Operations",
        level: "intermediate",
        prompt: "You are an onboarding assistant for [COMPANY NAME]. Guide new hires through their first week. On Day 1, introduce company culture and tools. On Day 2, explain team structure and key contacts. On Day 3–5, give role-specific tasks. Ask the new hire their name and role to personalize the experience."
      },
      {
        title: "Sales Objection Handler",
        useCase: "Sales",
        level: "intermediate",
        prompt: "You are a sales assistant for [PRODUCT/SERVICE] priced at [PRICE]. When a prospect raises an objection, respond with empathy, reframe the concern as a benefit, provide a relevant proof point, and close with a soft call-to-action. Common objections: price, timing, need, trust. Start by asking: 'What concern can I address for you today?'"
      },
      {
        title: "Interview Coach",
        useCase: "Career Development",
        level: "intermediate",
        prompt: "Act as a mock interview coach for a [JOB TITLE] role at a [INDUSTRY] company. Ask me one behavioral interview question at a time using the STAR format (Situation, Task, Action, Result). After my answer, give specific feedback on clarity, relevance, and impact. Ask 5 questions total, then give me an overall score out of 10."
      },
      {
        title: "Content Repurposer",
        useCase: "Content Marketing",
        level: "intermediate",
        prompt: "Take the following piece of content: [PASTE CONTENT]. Repurpose it into: (1) a 280-character tweet, (2) a 3-bullet LinkedIn post, (3) a 60-second video script, and (4) a 5-question quiz for audience engagement. Maintain the core message across all formats."
      },
      {
        title: "Competitive Analysis Bot",
        useCase: "Business Strategy",
        level: "intermediate",
        prompt: "Analyze [COMPETITOR NAME] as a competitor to [MY COMPANY/PRODUCT]. Cover: their key strengths, weaknesses, pricing strategy, target audience, and top 3 differentiators. Then suggest 3 strategic actions my company can take to compete more effectively."
      },
      {
        title: "Meeting Summarizer",
        useCase: "Productivity",
        level: "intermediate",
        prompt: "I'll paste meeting notes or a transcript below. Summarize it into: (1) Key decisions made, (2) Action items with owners and deadlines, (3) Open questions that need follow-up, and (4) A one-paragraph executive summary. Meeting notes: [PASTE NOTES]"
      },
      {
        title: "Email Campaign Planner",
        useCase: "Email Marketing",
        level: "intermediate",
        prompt: "Plan a 5-email drip campaign for [PRODUCT/SERVICE] targeting [TARGET AUDIENCE]. For each email, specify: subject line, send timing, goal (awareness/nurture/convert), key message, and a CTA. The campaign should follow this arc: Awareness → Interest → Consideration → Intent → Purchase."
      },
      {
        title: "Product Feedback Analyzer",
        useCase: "Product Management",
        level: "intermediate",
        prompt: "Analyze the following customer feedback for [PRODUCT NAME]: [PASTE FEEDBACK]. Categorize each piece of feedback by theme (UX, Performance, Features, Pricing, Support). Identify the top 3 pain points by frequency, and suggest one product improvement for each pain point."
      },
      {
        title: "Language Practice Partner",
        useCase: "Language Learning",
        level: "intermediate",
        prompt: "Have a conversation with me in [TARGET LANGUAGE] about [TOPIC]. I am at [A2/B1/B2] level. Correct my grammar mistakes gently by including the correction in parentheses after my sentence. Introduce 2–3 new vocabulary words naturally in each of your responses."
      },
      {
        title: "Research Deep Dive",
        useCase: "Research",
        level: "intermediate",
        prompt: "Research [TOPIC] for me. Structure your response as: (1) A plain-English overview (2 paragraphs), (2) 5 key facts with sources cited, (3) 3 common misconceptions debunked, (4) Current trends or developments in 2024–2025, and (5) 3 recommended resources for further reading."
      },
      {
        title: "Code Review Assistant",
        useCase: "Software Development",
        level: "intermediate",
        prompt: "Review the following [LANGUAGE] code for: readability, efficiency, potential bugs, and security vulnerabilities. For each issue found, explain what the problem is, why it matters, and provide a corrected code snippet. Code: [PASTE CODE]"
      },
      {
        title: "Brand Voice Trainer",
        useCase: "Branding",
        level: "intermediate",
        prompt: "Learn my brand voice from these examples: [PASTE 3 CONTENT SAMPLES]. Describe my brand voice in 5 adjectives, then rewrite the following draft content in my brand's voice: [PASTE DRAFT]. Explain what changes you made and why."
      },
      // ADVANCED (9)
      {
        title: "Multi-Turn Negotiation Simulator",
        useCase: "Business Negotiation",
        level: "advanced",
        prompt: "Simulate a business negotiation between me and a [VENDOR/CLIENT/PARTNER] regarding [DEAL TYPE] worth [VALUE]. Play the counterparty with realistic objections, anchoring strategies, and concession patterns based on [INDUSTRY] norms. After each exchange, privately coach me (in brackets) on my negotiation moves — what I did well, what leverage I missed, and what to try next. Start the negotiation."
      },
      {
        title: "Socratic Debate Partner",
        useCase: "Critical Thinking",
        level: "advanced",
        prompt: "Engage me in a Socratic dialogue about [TOPIC/ARGUMENT]. Your role is to challenge every claim I make with probing questions that expose assumptions, logical fallacies, and unconsidered perspectives. Do not let me accept any premise without justification. After 10 exchanges, summarize the strongest and weakest points of my argument."
      },
      {
        title: "Systems Thinking Analyzer",
        useCase: "Strategy & Planning",
        level: "advanced",
        prompt: "Apply systems thinking to [PROBLEM/SITUATION]. Map out: (1) Key actors and stakeholders, (2) Feedback loops (reinforcing and balancing), (3) Leverage points for intervention ranked by impact, (4) Second and third-order consequences of the top 3 interventions, and (5) A recommended action plan that minimizes unintended consequences."
      },
      {
        title: "AI Persona Designer",
        useCase: "AI Development",
        level: "advanced",
        prompt: "Design a custom AI persona for [USE CASE] with the following specifications: target user profile, personality traits, communication style, domain knowledge depth, ethical guardrails, and edge case handling protocols. Then generate the full system prompt for this persona, including tone guidelines, response structure, fallback behaviors, and 5 example Q&A pairs."
      },
      {
        title: "Executive Strategy Advisor",
        useCase: "C-Suite Decision Making",
        level: "advanced",
        prompt: "Act as a board-level strategy advisor for [COMPANY TYPE] facing [STRATEGIC CHALLENGE]. Apply Porter's Five Forces, SWOT, and Jobs-to-be-Done frameworks to diagnose the situation. Present 3 strategic options with risk/reward profiles, implementation timelines, and resource requirements. Recommend one option with a detailed 90-day action plan."
      },
      {
        title: "Scenario Planning Facilitator",
        useCase: "Risk & Futures Planning",
        level: "advanced",
        prompt: "Facilitate a scenario planning exercise for [ORGANIZATION/PROJECT] over a [5/10]-year horizon. Identify the 2 most critical and uncertain drivers of change. Build 4 distinct future scenarios from their intersections. For each scenario, describe the world in 2030, the implications for [ORGANIZATION], and 3 strategic moves to either exploit or hedge against that future."
      },
      {
        title: "Psychological Profiler",
        useCase: "Sales & Leadership",
        level: "advanced",
        prompt: "Based on the following communication sample from [PERSON/PROSPECT]: [PASTE TEXT], analyze their likely DISC or Big Five personality profile. Identify their core motivations, decision-making style, communication preferences, and potential objections. Then craft a tailored outreach message or leadership approach that resonates with their profile."
      },
      {
        title: "Complex Data Interpreter",
        useCase: "Data Analysis",
        level: "advanced",
        prompt: "Analyze the following dataset/report: [PASTE DATA]. Identify: (1) Statistical anomalies and outliers, (2) Hidden correlations not immediately obvious, (3) Potential causation vs. correlation traps, (4) The 3 most actionable insights for [BUSINESS GOAL], and (5) What additional data you would need to increase confidence in these conclusions."
      },
      {
        title: "Crisis Communication Architect",
        useCase: "PR & Communications",
        level: "advanced",
        prompt: "A crisis has occurred at [COMPANY]: [DESCRIBE CRISIS]. Develop a full crisis communication strategy covering: (1) Initial 24-hour response protocol, (2) Stakeholder communication matrix (employees, customers, media, regulators, investors), (3) Key messages and what to avoid saying, (4) Social media response playbook, and (5) Long-term reputation recovery roadmap."
      }
    ]
  },

  /* ============================================================
     WRITING
     ============================================================ */
  "Writing": {
    free: [
      {
        title: "Blog Post Generator",
        useCase: "Content Marketing",
        prompt: "Write a 800-word SEO-optimized blog post about [TOPIC] for [TARGET AUDIENCE]. Include: a compelling headline, an engaging intro that hooks the reader, 3–4 subheadings with practical tips, real examples, and a strong CTA at the end. Target keyword: [PRIMARY KEYWORD]."
      },
      {
        title: "Professional Email Writer",
        useCase: "Business Communication",
        prompt: "Write a professional email to [RECIPIENT ROLE] about [SUBJECT]. My goal is to [DESIRED OUTCOME]. Tone should be [FORMAL/FRIENDLY/ASSERTIVE]. Keep it under 150 words, get to the point quickly, and end with a clear next step or call to action."
      },
      {
        title: "Story Starter",
        useCase: "Creative Writing",
        prompt: "Write the opening 3 paragraphs of a [GENRE] short story featuring a protagonist who is [CHARACTER DESCRIPTION] and faces [CENTRAL CONFLICT]. Set the scene vividly, establish the character's voice, and end the opening with a hook that makes the reader desperate to continue."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Thank You Note Writer",
        useCase: "Personal Communication",
        level: "beginner",
        prompt: "Write a warm, sincere thank-you note to [PERSON] for [REASON]. Keep it personal, genuine, and under 100 words. Mention one specific detail about what they did and how it impacted me."
      },
      {
        title: "Product Description Writer",
        useCase: "E-commerce",
        level: "beginner",
        prompt: "Write a short product description for [PRODUCT NAME]. It is a [BRIEF PRODUCT DESCRIPTION]. Highlight 3 key benefits, use simple persuasive language, and end with a reason to buy now. Keep it under 80 words."
      },
      {
        title: "Social Media Caption",
        useCase: "Social Media",
        level: "beginner",
        prompt: "Write 3 different caption options for an Instagram post about [TOPIC/IMAGE DESCRIPTION]. Each caption should have a different tone: (1) inspirational, (2) humorous, (3) informative. Include 5 relevant hashtags for each."
      },
      {
        title: "Simple Cover Letter",
        useCase: "Job Search",
        level: "beginner",
        prompt: "Write a simple, one-page cover letter for a [JOB TITLE] position at [COMPANY NAME]. I have [X YEARS] experience in [FIELD]. My top 3 relevant skills are: [SKILL 1], [SKILL 2], [SKILL 3]. Keep the tone enthusiastic and professional."
      },
      {
        title: "Birthday Message Creator",
        useCase: "Personal Communication",
        level: "beginner",
        prompt: "Write a heartfelt birthday message for [PERSON] who is turning [AGE]. They are my [RELATIONSHIP]. Include a personal touch about [ONE THING YOU APPRECIATE ABOUT THEM] and wish them something meaningful for the year ahead."
      },
      {
        title: "FAQ Content Writer",
        useCase: "Website Content",
        level: "beginner",
        prompt: "Write 5 FAQ questions and answers for [PRODUCT/SERVICE]. Each answer should be 2–3 sentences, clear, and jargon-free. Questions should address: what it is, how it works, pricing, getting started, and support."
      },
      {
        title: "Event Announcement",
        useCase: "Event Marketing",
        level: "beginner",
        prompt: "Write an event announcement for [EVENT NAME] happening on [DATE] at [LOCATION/ONLINE]. Target audience: [AUDIENCE]. Include: what the event is about, why they should attend, key details, and a registration CTA. Keep it under 150 words."
      },
      {
        title: "Resume Bullet Points",
        useCase: "Career",
        level: "beginner",
        prompt: "Write 5 strong resume bullet points for a [JOB TITLE] role. My responsibilities included [LIST TASKS]. Use strong action verbs, quantify impact where possible, and keep each bullet under 20 words. Industry: [INDUSTRY]."
      },
      {
        title: "Newsletter Introduction",
        useCase: "Email Marketing",
        level: "beginner",
        prompt: "Write a friendly newsletter introduction for [NEWSLETTER NAME] — a weekly email about [TOPIC] for [AUDIENCE]. This week's theme is [THEME]. Keep it conversational, 3 sentences max, and make readers excited to read on."
      },
      // INTERMEDIATE (12)
      {
        title: "Long-Form Article Writer",
        useCase: "Content Strategy",
        level: "intermediate",
        prompt: "Write a 1,500-word in-depth article on [TOPIC] targeting [AUDIENCE]. Structure: compelling H1, intro with a surprising stat or story hook, 4 H2 sections each with 2–3 H3 sub-points, a data-backed insights section, and a conclusion with a clear takeaway. Include transition sentences between sections for flow. Primary keyword: [KEYWORD]."
      },
      {
        title: "Case Study Writer",
        useCase: "B2B Marketing",
        level: "intermediate",
        prompt: "Write a customer case study for [CLIENT/COMPANY] who used [PRODUCT/SERVICE] to solve [PROBLEM]. Structure: (1) Challenge — what the client was struggling with, (2) Solution — what they implemented and how, (3) Results — specific measurable outcomes, (4) Quote from client, (5) Key takeaways for similar companies. Length: 500 words."
      },
      {
        title: "Thought Leadership Article",
        useCase: "Personal Branding",
        level: "intermediate",
        prompt: "Write a thought leadership LinkedIn article from the perspective of a [JOB TITLE] in [INDUSTRY] about [CONTROVERSIAL OR NUANCED TOPIC]. Take a clear, defensible position that challenges conventional wisdom. Use personal anecdotes, data, and 3 key insights. End with a question that provokes comments. Length: 700 words."
      },
      {
        title: "White Paper Outline + Intro",
        useCase: "B2B Content",
        level: "intermediate",
        prompt: "Create a white paper on [TOPIC] for [TARGET COMPANY TYPE/DECISION MAKER]. Write: (1) A full outline with sections and sub-sections, (2) An executive summary (200 words), (3) A detailed introduction (300 words) that establishes the problem's urgency and previews the solution framework. Tone: authoritative and data-driven."
      },
      {
        title: "Email Sequence Writer",
        useCase: "Email Marketing",
        level: "intermediate",
        prompt: "Write a 4-email welcome sequence for new subscribers to [BRAND/PRODUCT] in [NICHE]. Email 1: Welcome + quick win. Email 2: Origin story + trust builder. Email 3: Social proof + case study. Email 4: Soft pitch. Each email: subject line, preview text, 200-word body, and CTA. Send spacing: Day 1, 3, 5, 7."
      },
      {
        title: "Scriptwriter for Video",
        useCase: "Video Content",
        level: "intermediate",
        prompt: "Write a 3-minute YouTube video script about [TOPIC] for [AUDIENCE]. Include: a hook in the first 15 seconds (question or bold statement), a clear structure (intro, 3 main points, conclusion), engagement prompts ('comment below...', 'subscribe if...'), and a natural conversational tone. Add [B-ROLL] suggestions in brackets."
      },
      {
        title: "Press Release Writer",
        useCase: "PR",
        level: "intermediate",
        prompt: "Write a press release for [COMPANY NAME] announcing [NEWS/PRODUCT/EVENT]. Include: a newsworthy headline, dateline, strong opening paragraph (who, what, when, where, why), supporting quotes from [EXECUTIVE NAME/TITLE], key details, and boilerplate about the company. Keep it to 400 words."
      },
      {
        title: "Copywriting Framework (PAS)",
        useCase: "Conversion Copywriting",
        level: "intermediate",
        prompt: "Write persuasive sales copy for [PRODUCT/SERVICE] using the Problem-Agitate-Solve (PAS) framework. Target audience: [AUDIENCE]. Pain point: [PAIN]. Make the agitation visceral and relatable (3 sentences), then present [PRODUCT] as the logical solution with 3 specific benefits and a compelling CTA."
      },
      {
        title: "Grant Proposal Writer",
        useCase: "Nonprofit / Education",
        level: "intermediate",
        prompt: "Write a grant proposal for [ORGANIZATION] applying to [GRANT NAME/FUNDER] for funding of [AMOUNT] to support [PROJECT]. Sections: (1) Executive Summary, (2) Statement of Need with data, (3) Project Description with SMART goals, (4) Evaluation Plan, (5) Budget Justification overview. Total length: 800 words."
      },
      {
        title: "Ghostwriting: Personal Essay",
        useCase: "Personal Branding",
        level: "intermediate",
        prompt: "Write a personal essay in first person for [PERSON'S NAME], a [PROFESSION] who wants to share their story about [EXPERIENCE/JOURNEY]. Voice: [DESCRIBE VOICE — e.g., reflective, raw, optimistic]. Include a pivotal turning-point moment, a lesson learned, and advice to others in a similar situation. Length: 600 words."
      },
      {
        title: "Technical Documentation Writer",
        useCase: "Software / Tech",
        level: "intermediate",
        prompt: "Write technical documentation for [FEATURE/TOOL NAME]. Audience: [DEVELOPER/END USER]. Include: Overview, Prerequisites, Step-by-step instructions (numbered), Code examples with comments, Common errors and troubleshooting, and a FAQ section. Use clear, concise language and consistent formatting."
      },
      {
        title: "Pitch Deck Narrative",
        useCase: "Startup / Fundraising",
        level: "intermediate",
        prompt: "Write the narrative copy for a startup pitch deck for [COMPANY NAME] in [INDUSTRY]. Slides needed: Problem, Solution, Market Size, Business Model, Traction, Team, Ask. For each slide, write a headline (max 8 words) and 3 supporting bullet points. Tone: confident, clear, investor-ready."
      },
      // ADVANCED (9)
      {
        title: "Multi-Chapter eBook Architect",
        useCase: "Content Product",
        level: "advanced",
        prompt: "Plan and write the first chapter of a 10-chapter eBook titled '[BOOK TITLE]' for [TARGET AUDIENCE]. Provide: (1) Full chapter-by-chapter outline with key takeaways per chapter, (2) Chapter 1 in full (1,000 words) with a strong narrative arc, (3) Transition hooks at the end of Chapter 1 leading into Chapter 2, (4) Suggested call-to-action placement throughout the book."
      },
      {
        title: "SEO Content Cluster Builder",
        useCase: "SEO Strategy",
        level: "advanced",
        prompt: "Build a full SEO content cluster for [MAIN TOPIC]. Provide: (1) One pillar page outline (2,000+ words) targeting [PRIMARY KEYWORD], (2) 8 cluster article topics with target keywords, search intent, and ideal word count, (3) Internal linking strategy, (4) Featured snippet optimization tips for the top 3 cluster articles, (5) A 6-month content calendar for publishing the cluster."
      },
      {
        title: "Brand Narrative Architect",
        useCase: "Branding",
        level: "advanced",
        prompt: "Develop a comprehensive brand narrative for [COMPANY/PRODUCT] targeting [AUDIENCE]. Deliverables: (1) Origin story (250 words), (2) Mission statement (1 sentence), (3) Vision statement (1 sentence), (4) Brand manifesto (200 words), (5) Core values with descriptions (5 values), (6) Brand voice guide with tone, vocabulary to use/avoid, and 3 example rewrites of bland copy into brand voice."
      },
      {
        title: "Ghost-Written Book Proposal",
        useCase: "Publishing",
        level: "advanced",
        prompt: "Write a full non-fiction book proposal for a book titled '[TITLE]' by [AUTHOR NAME], a [CREDENTIALS]. Sections: Overview, Market Analysis (competitive titles), Author Bio, Platform & Audience, Chapter-by-Chapter Summary (10 chapters), Sample Chapter (1,000 words). The book is about [TOPIC] and targets [AUDIENCE]. Tone: [DESCRIBE TONE]."
      },
      {
        title: "Investigative Article Structure",
        useCase: "Journalism",
        level: "advanced",
        prompt: "Structure an investigative article about [TOPIC/ISSUE]. Provide: (1) A headline and 3 alternative headlines, (2) A lede that hooks immediately, (3) A nut graf explaining why this matters now, (4) Key evidence sections with suggested sources and data points, (5) Counterargument section, (6) Expert quotes to seek out (roles, not names), (7) Conclusion that calls for action or reflection. Length guide: 2,500 words."
      },
      {
        title: "Screenwriting Scene Builder",
        useCase: "Film & TV Writing",
        level: "advanced",
        prompt: "Write a fully formatted screenplay scene for a [GENRE] film. The scene involves [CHARACTERS] in [LOCATION] where [CONFLICT/TENSION] occurs. Use proper screenplay format (scene heading, action lines, dialogue). The scene should be 2–3 pages long, reveal character through subtext rather than exposition, and end on a beat that raises the stakes."
      },
      {
        title: "Academic Research Paper Draft",
        useCase: "Academia",
        level: "advanced",
        prompt: "Draft the framework for an academic paper on [RESEARCH TOPIC] in [FIELD]. Include: (1) Abstract (250 words), (2) Introduction with thesis statement, (3) Literature review outline with 5 key theoretical frameworks, (4) Methodology section, (5) Proposed findings and discussion structure, (6) Conclusion outline, (7) 10 credible source suggestions in APA format."
      },
      {
        title: "Sales Letter (Long-Form)",
        useCase: "Direct Response Marketing",
        level: "advanced",
        prompt: "Write a long-form sales letter for [PRODUCT] priced at [PRICE]. Target: [AUDIENCE] who struggles with [PAIN POINT]. Structure: Big headline promise, personal story hook, problem identification, agitation, solution reveal, mechanism explanation, 5 bullet benefits, social proof (3 testimonials), objection handling, guarantee, urgency/scarcity, price anchor, CTA. Use AIDA + FOMO throughout. Target length: 1,500 words."
      },
      {
        title: "AI Prompt Engineering Guide",
        useCase: "AI & Tech Writing",
        level: "advanced",
        prompt: "Write a comprehensive guide on prompt engineering for [AI TOOL] targeting [AUDIENCE]. Cover: (1) Core principles of effective prompting with examples, (2) 5 advanced prompting techniques (chain-of-thought, few-shot, role prompting, etc.) each with before/after examples, (3) Common mistakes and fixes, (4) Domain-specific templates for [USE CASE 1], [USE CASE 2], [USE CASE 3], (5) Evaluation rubric for prompt quality."
      }
    ]
  },

  /* ============================================================
     IMAGE
     ============================================================ */
  "Image": {
    free: [
      {
        title: "Photorealistic Portrait",
        useCase: "Photography / AI Art",
        prompt: "A photorealistic portrait of [SUBJECT DESCRIPTION: e.g., a 30-year-old woman with curly red hair], [LIGHTING: e.g., soft golden hour lighting], [SETTING: e.g., standing in a sunflower field], shot on a [CAMERA: e.g., Canon EOS R5] with a [LENS: e.g., 85mm f/1.4 lens]. Ultra-detailed, sharp focus on eyes, bokeh background. --ar 2:3 --style raw"
      },
      {
        title: "Product Photography",
        useCase: "E-commerce",
        prompt: "Professional product photo of [PRODUCT DESCRIPTION] on a [BACKGROUND: e.g., clean white marble surface], with [LIGHTING: e.g., studio soft box lighting from the left], [PROPS: e.g., surrounded by fresh herbs and citrus slices]. Commercial photography style, ultra-sharp focus, high resolution, no shadows on background."
      },
      {
        title: "Concept Art Scene",
        useCase: "Game / Film Design",
        prompt: "Epic concept art of [SCENE: e.g., a futuristic city at night with flying cars], [STYLE: e.g., cyberpunk aesthetic], [MOOD: e.g., moody and atmospheric with neon reflections on wet streets], [PERSPECTIVE: e.g., wide establishing shot from street level], by [ARTIST STYLE: e.g., in the style of Blade Runner concept art]. Cinematic lighting, ultra-detailed, 8K."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Simple Logo Design",
        useCase: "Branding",
        level: "beginner",
        prompt: "A minimalist logo for a company called '[COMPANY NAME]' in the [INDUSTRY] industry. The logo should convey [3 BRAND VALUES: e.g., trust, innovation, simplicity]. Use [COLOR PALETTE]. Clean vector style, white background, no text unless it's the company name."
      },
      {
        title: "Cute Character Illustration",
        useCase: "Children's Content",
        level: "beginner",
        prompt: "A cute cartoon character of a [ANIMAL/CREATURE] who is a [PROFESSION/ROLE], wearing [OUTFIT], with a [EXPRESSION: e.g., big smile and sparkling eyes]. Flat illustration style, bright colors, clean lines, white background. Suitable for children's book illustration."
      },
      {
        title: "Social Media Banner",
        useCase: "Social Media Design",
        level: "beginner",
        prompt: "A vibrant social media banner for [PLATFORM: e.g., YouTube/Facebook/LinkedIn] for a [TYPE OF ACCOUNT: e.g., fitness coaching page]. Include visual elements related to [THEME]. Color palette: [COLORS]. Modern, clean design with space for text overlay. 16:9 aspect ratio."
      },
      {
        title: "Nature Wallpaper",
        useCase: "Personal / Desktop",
        level: "beginner",
        prompt: "A stunning 4K desktop wallpaper of [NATURE SCENE: e.g., a misty mountain forest at sunrise]. Hyper-realistic photography style, [MOOD: e.g., peaceful and serene], [TIME OF DAY: e.g., golden hour]. No text, ultra-wide 16:9 composition."
      },
      {
        title: "Birthday Card Design",
        useCase: "Personal",
        level: "beginner",
        prompt: "A cheerful digital birthday card design featuring [THEME: e.g., balloons, confetti, and a birthday cake]. Color scheme: [COLORS]. Fun and festive style, with a banner that reads 'Happy Birthday [NAME]'. Flat design, suitable for digital sharing."
      },
      {
        title: "Food Photography Style",
        useCase: "Food & Restaurant",
        level: "beginner",
        prompt: "A mouth-watering food photo of [DISH NAME: e.g., a stack of fluffy blueberry pancakes with maple syrup drizzle], on a [SURFACE: e.g., rustic wooden table], [ANGLE: e.g., shot from above (flat lay)], [GARNISH: e.g., with fresh blueberries and mint]. Natural window lighting, food magazine style."
      },
      {
        title: "Simple Avatar / Profile Pic",
        useCase: "Profile Design",
        level: "beginner",
        prompt: "A professional yet friendly profile picture avatar of [PERSON DESCRIPTION: e.g., a man in his 40s with short dark hair], [STYLE: e.g., illustrated/realistic], wearing [ATTIRE: e.g., a navy blue blazer]. Neutral background, [COLOR: e.g., light grey gradient]. Clean, suitable for LinkedIn or professional use."
      },
      {
        title: "Pattern / Textile Design",
        useCase: "Design / Crafts",
        level: "beginner",
        prompt: "A seamless repeating pattern featuring [MOTIFS: e.g., tropical flowers, leaves, and flamingos]. Color palette: [COLORS]. Style: [e.g., watercolor / flat geometric / boho]. Suitable for fabric printing, phone cases, or stationery. High resolution, tileable."
      },
      {
        title: "Motivational Quote Graphic",
        useCase: "Social Media",
        level: "beginner",
        prompt: "A visually appealing motivational quote graphic. Quote: '[YOUR QUOTE]'. Background: [e.g., soft gradient in purple and pink / bold dark background with gold accents]. Typography: modern and readable. Include subtle decorative elements. Square format (1:1), suitable for Instagram."
      },
      // INTERMEDIATE (12)
      {
        title: "Brand Identity Mockup",
        useCase: "Branding",
        level: "intermediate",
        prompt: "A professional brand identity mockup for [BRAND NAME] in the [INDUSTRY] space. Show the logo applied on: business card, letterhead, coffee cup, and tote bag. Brand colors: [COLORS]. Style: [MODERN/LUXURY/PLAYFUL]. Photo-realistic mockup presentation style, clean studio background."
      },
      {
        title: "Architectural Visualization",
        useCase: "Real Estate / Architecture",
        level: "intermediate",
        prompt: "A photorealistic architectural rendering of [BUILDING TYPE: e.g., a modern minimalist villa], [EXTERIOR FEATURES: e.g., with floor-to-ceiling windows, infinity pool, and wooden deck], set in [ENVIRONMENT: e.g., a hillside overlooking the ocean at dusk]. Warm ambient lighting, ultra-realistic materials (glass, concrete, wood), professional architectural photography style."
      },
      {
        title: "Fashion Editorial",
        useCase: "Fashion",
        level: "intermediate",
        prompt: "A high-fashion editorial photo of [SUBJECT: e.g., a model wearing an avant-garde outfit], in [SETTING: e.g., an abandoned industrial warehouse], with [LIGHTING: e.g., dramatic chiaroscuro lighting]. Style: [FASHION ERA/INFLUENCE: e.g., inspired by 90s Italian Vogue]. Shot on medium format camera, film grain, editorial magazine quality."
      },
      {
        title: "Infographic Illustration",
        useCase: "Data Visualization",
        level: "intermediate",
        prompt: "A clean, professional infographic illustrating [TOPIC: e.g., 'The 5 stages of the customer journey']. Include icons for each stage, flowing connecting lines, [COLOR SCHEME: e.g., blues and oranges]. Flat design style, readable typography, suitable for LinkedIn or presentation slides. Vertical layout (portrait)."
      },
      {
        title: "Fantasy Character Design",
        useCase: "Game / Publishing",
        level: "intermediate",
        prompt: "Full-body character design illustration of a [RACE: e.g., elven warrior], [GENDER: e.g., female], wearing [ARMOR/OUTFIT DESCRIPTION: e.g., intricately detailed silver plate armor with blue magical runes], wielding [WEAPON: e.g., a glowing longsword]. [HAIR: e.g., long silver hair], [EYES: e.g., glowing violet eyes]. Style: [e.g., detailed fantasy art, D&D sourcebook style]. Character sheet pose (front + side view), white background."
      },
      {
        title: "Cinematic Movie Poster",
        useCase: "Entertainment",
        level: "intermediate",
        prompt: "Design a cinematic movie poster for a [GENRE: e.g., sci-fi thriller] film titled '[MOVIE TITLE]'. Tagline: '[TAGLINE]'. Visual elements: [DESCRIBE KEY VISUAL: e.g., a lone astronaut standing on a desolate alien planet with two moons rising]. Color grading: [e.g., cold blue and orange tones]. Dramatic lighting, Hollywood blockbuster poster style. Portrait orientation."
      },
      {
        title: "Interior Design Visualization",
        useCase: "Interior Design",
        level: "intermediate",
        prompt: "Photorealistic interior design render of a [ROOM TYPE: e.g., living room] in [STYLE: e.g., Japandi / Scandinavian / Industrial] style. Key features: [LIST FEATURES: e.g., low-profile furniture, warm wood tones, a large statement plant, natural linen textiles]. [LIGHTING: e.g., warm afternoon light through large windows]. Ultra-detailed materials, architectural photography style."
      },
      {
        title: "Album Cover Art",
        useCase: "Music",
        level: "intermediate",
        prompt: "Design an album cover for a [GENRE: e.g., indie folk] artist named '[ARTIST NAME]'. Album title: '[ALBUM TITLE]'. Visual concept: [DESCRIBE CONCEPT: e.g., a solitary figure walking through a dense, foggy forest at dusk]. Color palette: [COLORS]. Style: [e.g., painterly / film photography / surrealist]. Square format (1:1)."
      },
      {
        title: "Children's Book Illustration",
        useCase: "Publishing",
        level: "intermediate",
        prompt: "A warm, detailed children's book illustration for a story about [STORY PREMISE: e.g., a young girl who discovers a magical library hidden inside her school's old oak tree]. Scene: [SPECIFIC SCENE TO ILLUSTRATE]. Style: [e.g., soft watercolor like Beatrix Potter / bright digital like Pixar]. Whimsical, age-appropriate, rich in detail and wonder."
      },
      {
        title: "Sports Action Photography Style",
        useCase: "Sports",
        level: "intermediate",
        prompt: "A dynamic, high-energy sports photograph of [ATHLETE/SPORT: e.g., a basketball player mid-dunk in an NBA arena], [CAMERA TECHNIQUE: e.g., captured with a 1/4000s freeze shot], [SETTING: e.g., packed crowd in background, motion blur on the crowd, sharp on athlete]. Dramatic arena lighting, sweat and intensity visible. Shot on Sony A1, 400mm f/2.8. Sports Illustrated cover quality."
      },
      {
        title: "Vintage Travel Poster",
        useCase: "Travel / Art",
        level: "intermediate",
        prompt: "A retro travel poster for [DESTINATION] in the style of 1950s–1960s airline travel posters. Show iconic [DESTINATION LANDMARKS/IMAGERY]. Color palette: [e.g., warm yellows, deep blues, coral reds] with flat, bold graphic design and clean typography. Include the text 'Visit [DESTINATION]' in a vintage font."
      },
      {
        title: "3D Product Render",
        useCase: "Product Design",
        level: "intermediate",
        prompt: "A photorealistic 3D render of [PRODUCT: e.g., a premium wireless headphone in matte black]. Show the product at a [ANGLE: e.g., 3/4 view, slightly elevated] on a [SURFACE/BACKGROUND: e.g., floating against a dark gradient background with subtle reflections]. Studio lighting with soft highlights. High-end tech product photography style."
      },
      // ADVANCED (9)
      {
        title: "Hyper-Detailed World Building Art",
        useCase: "World Building / Concept Art",
        level: "advanced",
        prompt: "Create a hyper-detailed establishing shot of [WORLD/SETTING: e.g., a massive underground city built inside a hollow asteroid], showing [SCALE ELEMENTS: e.g., thousands of bioluminescent buildings, tiny ships flying between towers, waterfalls of glowing blue liquid cascading between platforms]. [VISUAL INFLUENCES: e.g., Moebius + Blade Runner 2049 + Dune aesthetics]. Extreme level of detail in every corner, cinematic 2.39:1 aspect ratio, 8K."
      },
      {
        title: "Photorealistic Human Portrait Series",
        useCase: "Photography",
        level: "advanced",
        prompt: "A photorealistic portrait series of [SUBJECT] showing emotion progression: (Image 1) Neutral, (Image 2) Joy, (Image 3) Contemplative, (Image 4) Intense focus. Consistent lighting setup: [LIGHTING SETUP: e.g., Rembrandt lighting, single key light]. Same background, same framing (tight headshot). Shot on Hasselblad medium format, 100mm, ultra-sharp. Capture micro-expressions and skin texture with extreme realism."
      },
      {
        title: "Surrealist Composite Art",
        useCase: "Fine Art",
        level: "advanced",
        prompt: "Create a surrealist artwork combining [ELEMENT 1: e.g., a giant anatomical heart] and [ELEMENT 2: e.g., a blooming rose garden inside its chambers] and [ELEMENT 3: e.g., tiny human figures exploring the garden with lanterns]. Style: [e.g., in the tradition of Salvador Dalí, with hyperrealistic textures and impossible physics]. Symbolic and dreamlike. Museum-quality fine art. 1:1 square format."
      },
      {
        title: "Generative Pattern System",
        useCase: "Generative Art / Design",
        level: "advanced",
        prompt: "Design a cohesive generative art pattern system for [BRAND/PROJECT] with 4 pattern variations using the same base elements: [MOTIF 1], [MOTIF 2], [MOTIF 3]. Rules: Variation 1 = Dense, Variation 2 = Sparse, Variation 3 = Monochrome, Variation 4 = Maximum color. Each pattern seamlessly tiles. Inspired by [REFERENCE STYLE: e.g., Islamic geometric art / Bauhaus / computational design]. All use color palette: [HEX COLORS]."
      },
      {
        title: "Photo Manipulation / Compositing",
        useCase: "Photo Editing",
        level: "advanced",
        prompt: "Create a seamless photo manipulation composite: Take [BASE SCENE: e.g., a woman reading a book on a park bench] and replace the sky with [DRAMATIC SKY: e.g., a vast starfield with the Milky Way visible and a glowing nebula on the horizon]. Add [ELEMENTS: e.g., soft light spilling from the book's pages, fireflies floating around her]. Perfect lighting consistency, matching color grading, photorealistic compositing. No visible seams."
      },
      {
        title: "Brand Campaign Visual",
        useCase: "Advertising",
        level: "advanced",
        prompt: "Create a hero campaign visual for [BRAND] launching [PRODUCT/CAMPAIGN]. Concept: [DESCRIBE CREATIVE CONCEPT: e.g., 'The product transforms ordinary moments into extraordinary ones — show a mundane kitchen scene exploding into a universe of flavor']. Deliverables: (1) Full campaign image, (2) Color grades for 3 different platforms (social = vibrant, print = cinematic, OOH = high contrast). Brand elements: [LOGO PLACEMENT, COLORS, TAGLINE PLACEMENT]."
      },
      {
        title: "Animated Storyboard Frames",
        useCase: "Animation / Film",
        level: "advanced",
        prompt: "Create storyboard frames for a [30-SECOND/60-SECOND] [GENRE] animation/commercial. Story: [BRIEF STORY]. Frames needed: (1) Establishing shot, (2) Character introduction, (3) Conflict/challenge moment, (4) Climax, (5) Resolution. Each frame: include camera angle notation, character expressions, and action description. Clean, clear storyboard style with grid layout."
      },
      {
        title: "NFT / Digital Art Collection",
        useCase: "Digital Art / Web3",
        level: "advanced",
        prompt: "Design a cohesive NFT digital art collection of 5 pieces with the theme '[COLLECTION THEME]'. Each piece should: share a consistent visual DNA (color palette: [COLORS], style: [ART STYLE]), feature a unique [CHARACTER/ELEMENT] with distinct traits, tell a sequential narrative story when viewed in order. Pieces 1–5: [BRIEF DESCRIPTION OF EACH]. Ultra-high detail, collectible quality, square format 1:1."
      },
      {
        title: "Visual Identity System",
        useCase: "Brand Design",
        level: "advanced",
        prompt: "Design a complete visual identity system for [BRAND NAME] in [INDUSTRY]. Create and show: (1) Primary logo + 3 logo variants (horizontal, stacked, icon-only), (2) Color system (primary, secondary, accent, neutrals with hex codes), (3) Typography pairing (display + body font), (4) Icon set (6 custom icons), (5) Brand pattern/texture, (6) Applied mockups: business card, website header, app icon, packaging. Cohesive and distinctive brand identity."
      }
    ]
  },


  /* ============================================================
     VIDEO
     ============================================================ */
  "Video": {
    free: [
      {
        title: "YouTube Script Hook",
        useCase: "YouTube Content",
        prompt: "Write a powerful 60-second YouTube video hook for a video titled '[VIDEO TITLE]'. The hook must: start with a bold statement or question that stops scrolling, establish why this video matters to [TARGET AUDIENCE], and tease the key payoff they'll get by watching. End with a smooth transition into the main content. No fluff — every word earns its place."
      },
      {
        title: "Short-Form Video Concept",
        useCase: "TikTok / Reels / Shorts",
        prompt: "Generate 5 short-form video concepts for [BRAND/CREATOR] in the [NICHE] space. Each concept should include: a scroll-stopping first 2 seconds, the core message, ideal format (talking head/B-roll/text overlay), and a hook line. Optimize for [TIKTOK/REELS/SHORTS]. Target audience: [AUDIENCE]."
      },
      {
        title: "Video Ad Script (15-Second)",
        useCase: "Paid Advertising",
        prompt: "Write a 15-second video ad script for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Structure: 0–3s: Pattern interrupt hook, 3–10s: Core benefit/problem solved, 10–13s: Social proof or guarantee, 13–15s: CTA. Include visual direction notes in [brackets]. Tone: [ENERGETIC/CALM/AUTHORITATIVE]."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Video Caption Generator",
        useCase: "Accessibility",
        level: "beginner",
        prompt: "Write clean, accurate captions for this video transcript: [PASTE TRANSCRIPT]. Format as SRT subtitle file with timing cues every 3–5 seconds. Break sentences naturally at pause points. Correct any speech-to-text errors for proper grammar and punctuation."
      },
      {
        title: "Simple Video Title & Description",
        useCase: "YouTube SEO",
        level: "beginner",
        prompt: "Write a YouTube video title and description for a video about [TOPIC]. Title: under 60 characters, include keyword [KEYWORD], create curiosity. Description: 150 words, include keyword naturally 2–3 times, summarize the video, list 3 key timestamps, add 5 relevant tags at the bottom."
      },
      {
        title: "Talking Head Script",
        useCase: "Personal Branding",
        level: "beginner",
        prompt: "Write a 2-minute talking-head video script for [CREATOR NAME] about [TOPIC]. Conversational tone, as if talking to a friend. Include: an opening question to the audience, 3 main tips each under 20 seconds, a relatable personal story (30 seconds), and a call to action. No jargon."
      },
      {
        title: "Tutorial Video Outline",
        useCase: "How-To Content",
        level: "beginner",
        prompt: "Create a step-by-step outline for a tutorial video on 'How to [TASK]'. Include: intro (problem + what they'll learn), prerequisite list, numbered steps with estimated time per step, common mistake warnings, and a closing summary. Total video target: [X MINUTES]."
      },
      {
        title: "Reaction Video Script",
        useCase: "Entertainment",
        level: "beginner",
        prompt: "Write a reaction video script for [CREATOR] reacting to [CONTENT BEING REACTED TO]. Include genuine commentary prompts for 5 key moments, transition phrases between reactions, and an outro with the creator's overall take and audience question. Natural, conversational tone."
      },
      {
        title: "Vlog Intro Script",
        useCase: "Vlogging",
        level: "beginner",
        prompt: "Write a 30-second vlog intro for [CREATOR NAME]'s video about [TODAY'S VLOG TOPIC]. Energetic and personal, like greeting a friend. Include a teaser of the best moment from today's vlog to create anticipation. End with a friendly invite to 'follow along'."
      },
      {
        title: "Product Unboxing Script",
        useCase: "Review Content",
        level: "beginner",
        prompt: "Write an unboxing and first impressions video script for [PRODUCT NAME]. Cover: packaging presentation, first reactions, listing what's in the box, build quality observations, and an honest initial verdict. Conversational and authentic. Target length: 5 minutes."
      },
      {
        title: "Video Thumbnail Text Ideas",
        useCase: "YouTube Growth",
        level: "beginner",
        prompt: "Give me 10 thumbnail text options for a YouTube video about [TOPIC]. Each option: max 5 words, high contrast readability, create curiosity or urgency. Mark the top 3 with ⭐. Also describe the ideal thumbnail image composition for each top pick."
      },
      {
        title: "End Screen CTA Script",
        useCase: "Channel Growth",
        level: "beginner",
        prompt: "Write a 30-second end screen script for a YouTube video on [TOPIC]. Include: a quick recap of the main takeaway, a recommendation for the next video to watch (about [RELATED TOPIC]), a subscribe pitch with a specific reason to subscribe, and a like/comment prompt."
      },
      // INTERMEDIATE (12)
      {
        title: "Documentary Treatment",
        useCase: "Documentary Filmmaking",
        level: "intermediate",
        prompt: "Write a documentary treatment for a [SHORT/FEATURE] documentary about [SUBJECT]. Include: logline (25 words), director's vision statement, story structure (Act 1/2/3), key characters/subjects with descriptions, visual approach and tone, interview subjects needed, and why this story matters now. Length: 500 words."
      },
      {
        title: "Brand Video Storyboard Script",
        useCase: "Brand Marketing",
        level: "intermediate",
        prompt: "Write a 90-second brand video script and storyboard for [COMPANY]. Core message: [BRAND MESSAGE]. Structure: Emotion-led open (show the world before the product), conflict/pain moment, brand introduction as the solution, transformation/results montage, brand tagline close. Include visual directions for each scene and VO (voiceover) text."
      },
      {
        title: "Explainer Video Script",
        useCase: "Product Marketing",
        level: "intermediate",
        prompt: "Write a 2-minute animated explainer video script for [PRODUCT/SERVICE]. Audience: [AUDIENCE]. Cover: the problem they face, why current solutions fail, how [PRODUCT] works (simplified in 3 steps), key benefits (3 max), social proof sentence, and CTA. Engaging, jargon-free, suitable for animation. Include scene transition notes."
      },
      {
        title: "Video Podcast Episode Plan",
        useCase: "Podcasting",
        level: "intermediate",
        prompt: "Plan a video podcast episode with guest [GUEST NAME/TITLE] on the topic of [TOPIC]. Create: 10 interview questions ordered from rapport-building to deep insight, 3 audience interaction prompts, a 60-second sponsor read template, an intro script for the host, and a compelling episode title with 3 alternatives."
      },
      {
        title: "YouTube Series Pilot Script",
        useCase: "Series Content",
        level: "intermediate",
        prompt: "Write the pilot episode script for a YouTube series called '[SERIES NAME]' about [TOPIC]. Episode 1: establish the premise, introduce the host/format, deliver genuine value on [SPECIFIC TOPIC], and set expectations for the series. Target: 10–12 minutes. Include scene breaks, B-roll cues, and on-screen text suggestions."
      },
      {
        title: "Social Video Ad (60-Second)",
        useCase: "Performance Marketing",
        level: "intermediate",
        prompt: "Write a 60-second social media video ad script for [PRODUCT] targeting [AUDIENCE] on [PLATFORM]. Use the UGC (User Generated Content) style — authentic, raw, relatable. Structure: 0–5s hook (pain point), 5–20s relatability build, 20–40s product demonstration, 40–55s testimonial-style proof, 55–60s CTA. Include on-screen text and caption suggestions."
      },
      {
        title: "Event Recap Video Script",
        useCase: "Events",
        level: "intermediate",
        prompt: "Write a 3-minute event recap video script for [EVENT NAME]. Include: opening energy montage narration, key highlights and moments (5 moments), speaker/attendee quote integration points, behind-the-scenes moment, and a closing CTA for next year's event or related product. Exciting, energetic tone."
      },
      {
        title: "Training Video Module Script",
        useCase: "Corporate Training",
        level: "intermediate",
        prompt: "Write a training video script for Module [X] of [COURSE/TRAINING NAME]: '[MODULE TITLE]'. Learning objectives: [LIST 3 OBJECTIVES]. Structure: welcome and objectives intro, core instruction in 3 segments with examples, knowledge check questions (3), summary of key takeaways. Length: 8–10 minutes. Professional but engaging tone."
      },
      {
        title: "News Report Style Script",
        useCase: "Journalism / Media",
        level: "intermediate",
        prompt: "Write a 2-minute news report script about [NEWS TOPIC]. Include: anchor intro, field reporter segment with on-location narration, 2 interview soundbite placeholders, data/statistics presentation, and anchor close with a forward-looking statement. Broadcast journalism style — clear, concise, and balanced."
      },
      {
        title: "Comedy Sketch Script",
        useCase: "Entertainment",
        level: "intermediate",
        prompt: "Write a 3-minute comedy sketch about [PREMISE/SCENARIO]. Characters: [CHARACTER 1 DESCRIPTION] and [CHARACTER 2 DESCRIPTION]. Include: setup (30s), escalating misunderstanding or absurdity (2 minutes), punchline/resolution (30s). Format as a proper script with character names, dialogue, and stage directions. Tone: [DRY/ABSURDIST/SLAPSTICK]."
      },
      {
        title: "Crowdfunding Video Script",
        useCase: "Fundraising",
        level: "intermediate",
        prompt: "Write a 3-minute crowdfunding video script for [PROJECT NAME] by [CREATOR/TEAM]. Structure: personal story hook, the problem this project solves, the vision and what the product/project does, behind-the-scenes authenticity moment, reward tiers overview, and emotional CTA. Genuine, passionate tone that builds trust."
      },
      {
        title: "Multi-Platform Video Strategy",
        useCase: "Content Strategy",
        level: "intermediate",
        prompt: "Develop a multi-platform video content strategy for [BRAND] in [INDUSTRY]. For each platform (YouTube, TikTok, Instagram, LinkedIn), specify: content pillars (3 per platform), video formats and lengths, posting frequency, tone adjustments, and one hero video concept. Include a 30-day content calendar with 20 video ideas distributed across platforms."
      },
      // ADVANCED (9)
      {
        title: "Feature Film Short Script",
        useCase: "Film Writing",
        level: "advanced",
        prompt: "Write a complete 10-minute short film script in [GENRE] titled '[TITLE]'. Include: proper screenplay formatting, a protagonist with a clear want and need, an inciting incident, escalating conflict, climax, and resolution. Theme: [THEME]. Setting: [SETTING]. The story should work with minimal dialogue — let visuals tell the story. End on a resonant, memorable note."
      },
      {
        title: "Video SEO Domination Plan",
        useCase: "YouTube SEO",
        level: "advanced",
        prompt: "Build a comprehensive YouTube SEO strategy to rank for [TARGET KEYWORD CLUSTER] in [NICHE]. Provide: (1) Keyword research with 20 long-tail targets and search intent, (2) Video title formulas that rank AND convert, (3) Description templates with keyword density, (4) Thumbnail psychology principles for high CTR, (5) End screen and card strategy for watch time, (6) Community post and shorts strategy to feed the algorithm, (7) 90-day channel growth playbook."
      },
      {
        title: "Interactive Video Script",
        useCase: "EdTech / Marketing",
        level: "advanced",
        prompt: "Write an interactive branching video script for [USE CASE: e.g., product demo / training / choose-your-own-adventure]. Create 3 choice points where viewers select their path. Each branch: 60–90 seconds. Map out the full decision tree with 8 possible endpoints. Each endpoint must deliver a satisfying, complete experience. Include on-screen prompt text for each choice moment."
      },
      {
        title: "Viral Video Formula Analysis & Creation",
        useCase: "Viral Marketing",
        level: "advanced",
        prompt: "Analyze the viral mechanics of [REFERENCE VIRAL VIDEO/TREND] and apply them to create a concept for [BRAND/CREATOR] in [NICHE]. Provide: (1) Deconstruction of why the reference went viral (emotion, timing, shareability, algorithm fit), (2) Adapted concept for [BRAND] that retains the viral mechanics, (3) Full script/storyboard, (4) Distribution and seeding strategy, (5) Metrics to track for virality indicators."
      },
      {
        title: "Documentary Series Bible",
        useCase: "Documentary / Streaming",
        level: "advanced",
        prompt: "Write a series bible for a [X]-episode documentary series titled '[SERIES TITLE]' about [SUBJECT]. Include: series logline, creator's statement, episode-by-episode breakdown with key story beats, character arcs across episodes, visual and tonal reference films, intended platform and audience, production requirements overview, and what makes this series urgent and unmissable right now."
      },
      {
        title: "Video Sales Letter (VSL) Script",
        useCase: "Sales",
        level: "advanced",
        prompt: "Write a high-converting 10-minute Video Sales Letter (VSL) for [PRODUCT] priced at [PRICE]. Follow the proven VSL formula: (1) Pattern interrupt hook, (2) Big promise, (3) Proof of credibility, (4) Problem agitation, (5) Solution reveal, (6) Mechanism explanation, (7) Testimonials/case studies, (8) What's included breakdown, (9) Price reveal + anchor, (10) Guarantee, (11) Urgency/scarcity, (12) CTA. Every word is written to reduce friction and drive action."
      },
      {
        title: "Immersive Experience Video Script",
        useCase: "VR / Immersive Media",
        level: "advanced",
        prompt: "Write a 5-minute 360° VR or immersive experience script for [BRAND/PURPOSE: e.g., a virtual product tour / empathy experience / branded world]. Account for: spatial audio design notes, audience attention direction techniques (no camera cuts), interactive hotspot placements, ambient narrative pacing, and emotional arc. The experience should work on standalone headsets. Include technical direction notes."
      },
      {
        title: "Live Stream Show Format",
        useCase: "Live Content",
        level: "advanced",
        prompt: "Design a recurring weekly live stream show format for [CREATOR/BRAND] in [NICHE]. Specify: show name and concept, 60-minute run-of-show with segment breakdown, recurring segments that build audience habit, audience participation mechanics, guest booking criteria, technical setup requirements, monetization integration (donations, memberships, sponsors), and a 3-month content arc with seasonal themes."
      },
      {
        title: "Cinematic Brand Film",
        useCase: "Premium Brand Marketing",
        level: "advanced",
        prompt: "Write the script and creative brief for a cinematic 3-minute brand film for [BRAND] with the theme '[THEME]'. This is not a product demo — it's a cultural statement. Include: A cinematic narrative that embodies the brand's values without showing the product until the final 20 seconds, emotional journey arc, voiceover poetry (if applicable), director's visual reference list, music mood brief, casting direction, and the single feeling you want the viewer to have at the end."
      }
    ]
  },

  /* ============================================================
     AUDIO
     ============================================================ */
  "Audio": {
    free: [
      {
        title: "Podcast Episode Outline",
        useCase: "Podcasting",
        prompt: "Create a detailed outline for a podcast episode titled '[EPISODE TITLE]' for a show about [SHOW TOPIC]. Include: a hook intro (first 60 seconds), 4 main segments with talking points, 1 guest interview segment with 5 questions, a sponsor break script template, and a memorable outro with a teaser for next episode. Target episode length: [X] minutes."
      },
      {
        title: "Song Lyrics Generator",
        useCase: "Music Creation",
        prompt: "Write original song lyrics for a [GENRE: e.g., pop/R&B/country] song about [THEME/EMOTION]. Structure: Verse 1 (8 lines), Pre-chorus (4 lines), Chorus (8 lines), Verse 2 (8 lines), Bridge (6 lines), Final Chorus. Mood: [MOOD]. Rhyme scheme: [AABB/ABAB/ABCB]. Avoid clichés — make every line vivid and specific."
      },
      {
        title: "Voiceover Script (Commercial)",
        useCase: "Advertising",
        prompt: "Write a 30-second radio/podcast ad voiceover script for [PRODUCT/SERVICE]. Target audience: [AUDIENCE]. Tone: [WARM/ENERGETIC/AUTHORITATIVE]. Include: attention-grabbing opening, core benefit statement, proof point, and a clear CTA with contact info placeholder. Mark pauses with [PAUSE] and emphasis with CAPS."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Podcast Episode Title & Description",
        useCase: "Podcast Marketing",
        level: "beginner",
        prompt: "Write a compelling title and show notes description for a podcast episode about [TOPIC]. Title: under 60 characters, SEO-friendly, curiosity-driven. Description: 150 words covering the guest/topic, 3 key insights from the episode, and 5 relevant tags. Include a [TIMESTAMP] template for chapters."
      },
      {
        title: "Simple Jingle Concept",
        useCase: "Brand Audio",
        level: "beginner",
        prompt: "Write a catchy 15-second jingle concept for [BRAND NAME] in [INDUSTRY]. Include: the lyrics/melody description, the core message to reinforce, and the emotional tone (fun/trustworthy/exciting). Suggest the musical genre and instrumentation style."
      },
      {
        title: "Meditation Script (Short)",
        useCase: "Wellness",
        level: "beginner",
        prompt: "Write a 5-minute guided meditation script focused on [THEME: e.g., stress relief / morning energy / sleep]. Use gentle, calming language, clear breathing instructions, and vivid but simple imagery. Indicate [PAUSE] points and [SLOW BREATH] cues throughout."
      },
      {
        title: "Audiobook Chapter Narration Style",
        useCase: "Publishing",
        level: "beginner",
        prompt: "Adapt this written text into an audiobook-friendly narration: [PASTE TEXT]. Add: natural pause indicators [PAUSE], emphasis cues [EMPHASIZE], and pacing notes [SLOW/FAST]. Make it comfortable to listen to for 10–15 minutes per session. Simplify overly complex sentences for the ear."
      },
      {
        title: "Sound Design Brief",
        useCase: "Audio Production",
        level: "beginner",
        prompt: "Write a sound design brief for [SCENE/PROJECT: e.g., a 30-second product launch video intro]. Describe: the emotional atmosphere, key sound effects needed (5–8 sounds with timecode), music mood and genre, any brand audio identity elements, and the overall audio arc from start to finish."
      },
      {
        title: "Interview Question Bank",
        useCase: "Podcast / Interview",
        level: "beginner",
        prompt: "Generate 20 interview questions for a podcast guest who is a [GUEST'S PROFESSION/BACKGROUND] being interviewed about [TOPIC]. Mix: 5 personal/origin story questions, 8 expertise/insight questions, 4 controversial/challenging questions, and 3 forward-looking questions. Avoid yes/no questions — all should invite storytelling."
      },
      {
        title: "ASMR Script",
        useCase: "ASMR Content",
        level: "beginner",
        prompt: "Write a 10-minute ASMR script for the scenario: '[ASMR SCENARIO: e.g., a cozy bookshop visit / library ambience / personal attention session]'. Include: gentle, slow narration, soft trigger descriptions (page turning, rain sounds, whispering), specific sound cues in [brackets], and a soothing closing. Written as if speaking directly to the listener."
      },
      {
        title: "Radio Station Promo",
        useCase: "Radio / Broadcasting",
        level: "beginner",
        prompt: "Write a 20-second radio station promo for [STATION NAME] in [FORMAT: e.g., Top 40/News Talk/Country]. Include: station identity tagline, 2 program highlights, and a memorable sign-off. Energetic and punchy. Include voice direction notes [MALE VO/FEMALE VO/FAST/SLOW]."
      },
      {
        title: "Podcast Guest Pitch",
        useCase: "Podcast Growth",
        level: "beginner",
        prompt: "Write a cold email pitch for [GUEST NAME], a [GUEST TITLE], to appear on [PODCAST NAME] which covers [PODCAST TOPIC] for [AUDIENCE SIZE] listeners. Include: personalized opener referencing their work, why they're a perfect fit, what value they'll get from appearing, 3 episode topic ideas, and a low-friction CTA."
      },
      // INTERMEDIATE (12)
      {
        title: "Full Podcast Show Bible",
        useCase: "Podcast Launch",
        level: "intermediate",
        prompt: "Create a full show bible for a new podcast called '[PODCAST NAME]' about [TOPIC] targeting [AUDIENCE]. Include: show concept and positioning, host bio and tone, episode format and length, recurring segments, 10 episode ideas for Season 1, guest criteria, release schedule, distribution strategy, and monetization roadmap."
      },
      {
        title: "Music Composition Brief",
        useCase: "Music Production",
        level: "intermediate",
        prompt: "Write a detailed music composition brief for [PROJECT TYPE: e.g., a film score cue / brand anthem / video game background track]. Specify: mood and emotion arc, reference tracks (list 3), BPM range, key/scale preference, instrumentation, dynamic range instructions, and how the music should evolve from start to finish. Length: [X SECONDS/MINUTES]."
      },
      {
        title: "Narrative Podcast Script",
        useCase: "Narrative Audio",
        level: "intermediate",
        prompt: "Write a 15-minute narrative podcast script about [TRUE STORY/TOPIC] in the style of Serial or This American Life. Include: opening hook with scene-setting narration, 3 acts with rising tension, interview excerpt placeholders with context, ambient sound direction, and a resonant closing thought. Journalistic, story-driven tone."
      },
      {
        title: "Voice App / Skill Script",
        useCase: "Alexa / Google Voice",
        level: "intermediate",
        prompt: "Write the conversational script for a [ALEXA SKILL / GOOGLE ACTION] called '[APP NAME]' that helps users [MAIN FUNCTION]. Include: welcome message, main menu options, 5 core interaction flows with user says / app responds format, error handling responses, and exit phrases. Keep all responses under 30 seconds of speaking time."
      },
      {
        title: "Sonic Branding Strategy",
        useCase: "Brand Audio Identity",
        level: "intermediate",
        prompt: "Develop a sonic branding strategy for [BRAND] in [INDUSTRY]. Cover: (1) Brand audio identity brief (mood, values, sound personality), (2) Logo sound (3-second audio signature) description, (3) On-hold music concept, (4) Notification sound design, (5) Brand anthem direction (full 60-second track brief), (6) Audio guidelines for ads across platforms. Reference comparable brand sounds."
      },
      {
        title: "Podcast Monetization Playbook",
        useCase: "Podcast Business",
        level: "intermediate",
        prompt: "Create a monetization playbook for '[PODCAST NAME]' with [NUMBER] monthly downloads in the [NICHE] space. Cover: (1) Sponsorship rate card with CPM benchmarks, (2) Mid-roll sponsor script template, (3) Listener membership tiers and benefits, (4) Premium episode strategy, (5) Live event concept, (6) Merchandise recommendation, (7) Affiliate integration approach. Include revenue projections for 12 months."
      },
      {
        title: "Music Video Concept",
        useCase: "Music Marketing",
        level: "intermediate",
        prompt: "Write a creative concept for a music video for the song '[SONG TITLE]' by [ARTIST]. Song mood/genre: [GENRE]. Concept: [NARRATIVE OR VISUAL CONCEPT]. Include: scene-by-scene visual breakdown (8 scenes), color grading direction, location requirements, cast description, and how the visual concept amplifies the song's emotional message. Director's treatment style."
      },
      {
        title: "Audio Drama Script",
        useCase: "Audio Fiction",
        level: "intermediate",
        prompt: "Write a 20-minute audio drama episode for a [GENRE] series called '[SERIES NAME]'. Episode [X]: '[EPISODE TITLE]'. Characters: [LIST CHARACTERS]. The episode should advance the story arc of [MAIN PLOT THREAD], include a character revelation, and end on a cliffhanger. Write in full script format with sound effect cues [SFX:], music cues [MUSIC:], and cast list."
      },
      {
        title: "Ep Structured Q&A Format",
        useCase: "Interview Podcasting",
        level: "intermediate",
        prompt: "Design a structured interview format for a podcast episode with [GUEST NAME/TYPE] on [TOPIC]. Create: a 5-minute rapport-building opening sequence, 3 thematic segments (each 10 minutes) with 3 questions per segment, a 'lightning round' with 5 quick-fire questions, and a closing 3-question sequence that leaves listeners with an action item. Include host transition phrases."
      },
      {
        title: "Album Concept & Track Listing",
        useCase: "Music Creation",
        level: "intermediate",
        prompt: "Develop a complete album concept for [ARTIST NAME] in the [GENRE] space. Include: album title and theme, 12-track listing with song titles, a 2-sentence description of each song's mood and subject, the album's emotional arc from Track 1 to 12, production style direction, and album artwork concept brief."
      },
      {
        title: "Audio Course Curriculum",
        useCase: "EdTech / E-Learning",
        level: "intermediate",
        prompt: "Design a 10-module audio course on '[TOPIC]' for [AUDIENCE]. For each module: title, learning objective, 3 key concepts to cover, a practical exercise the listener can do while commuting/walking, and a reflection question. Total listening time target: [X HOURS]. Include an intro episode and a bonus 'action guide' episode."
      },
      {
        title: "Podcast Series Launch Campaign",
        useCase: "Marketing",
        level: "intermediate",
        prompt: "Create a launch campaign plan for the new podcast '[PODCAST NAME]' dropping on [DATE]. Cover: (1) Pre-launch teaser content (3 social posts, 1 email), (2) Launch week content calendar, (3) Guest promotion kit (share assets for guests), (4) PR outreach targets, (5) Playlist submission strategy (Spotify editorial, Apple Podcasts), (6) 30-day growth tactics post-launch."
      },
      // ADVANCED (9)
      {
        title: "Full Film Score Brief",
        useCase: "Film Scoring",
        level: "advanced",
        prompt: "Write a complete film score brief for [FILM TITLE], a [GENRE] film. For each of the 5 key sequences: (1) Opening title sequence, (2) Protagonist introduction, (3) Central conflict moment, (4) Emotional climax, (5) Resolution/credits — specify: emotional arc, instrumentation, tempo, dynamics, how music interacts with dialogue and SFX, and reference tracks. Include a thematic motif concept for the protagonist."
      },
      {
        title: "Immersive Audio Experience Design",
        useCase: "Spatial Audio / XR",
        level: "advanced",
        prompt: "Design a 10-minute binaural/spatial audio experience for [PURPOSE: e.g., a brand activation / relaxation product / museum exhibit]. Map the entire soundscape: (1) 3D audio positioning of all sound elements across the timeline, (2) Emotional and psychological design intent per minute, (3) Transition techniques between scenes, (4) Technical delivery specs (format, channels, headphone optimization), (5) Integration with [VR/AR/physical environment if applicable]."
      },
      {
        title: "Podcast Network Strategy",
        useCase: "Media Business",
        level: "advanced",
        prompt: "Build a 3-year strategy for launching a podcast network in the [NICHE] space starting with [ANCHOR SHOW NAME]. Cover: (1) Network positioning and brand identity, (2) Show lineup (5 shows with concepts, audiences, and hosts), (3) Content interlinking and cross-promotion strategy, (4) Revenue model (advertising, premium, licensing), (5) Technology stack, (6) Talent acquisition and retention, (7) Year 1–3 milestones and KPIs."
      },
      {
        title: "AI Voice Clone Brief",
        useCase: "AI Audio Production",
        level: "advanced",
        prompt: "Write a comprehensive brief for creating an AI voice clone for [BRAND/PERSON]. Include: (1) Voice character description (age, gender, accent, warmth, authority level), (2) Training data requirements (hours, recording conditions, content types), (3) Use case deployment plan (IVR, podcast ads, audiobook, assistant), (4) Quality evaluation rubric (naturalness, brand fit, pronunciation accuracy), (5) Ethical consent and disclosure framework, (6) Rollout and testing protocol."
      },
      {
        title: "Music Licensing Strategy",
        useCase: "Music Business",
        level: "advanced",
        prompt: "Develop a music licensing strategy for [ARTIST/LABEL] to maximize sync licensing revenue. Cover: (1) Catalog audit and categorization by sync potential, (2) Target media verticals (film, TV, ads, games, social media) with rates and entry points, (3) Pitching strategy for music supervisors, (4) Music library submission plan (10 target libraries with priorities), (5) Metadata optimization for discoverability, (6) Revenue projections and tracking system."
      },
      {
        title: "Podcast Acquisition Pitch Deck",
        useCase: "Media M&A",
        level: "advanced",
        prompt: "Write the narrative for a pitch deck to sell/acquire podcast '[SHOW NAME]' with [DOWNLOAD NUMBERS] monthly downloads in the [NICHE] space. Sections: Show Overview, Audience Demographics & Psychographics, Revenue Breakdown (current + upside), Competitive Positioning, Growth Trajectory (12-month forecast), Synergy Analysis for acquirer, Deal Structure options, and a Risk/Mitigation analysis."
      },
      {
        title: "Voice UI/UX Design System",
        useCase: "Conversational AI / Voice Products",
        level: "advanced",
        prompt: "Design a comprehensive Voice UI system for [PRODUCT: e.g., a smart home assistant / IVR system / in-car AI]. Deliver: (1) Voice persona design document (personality, speech patterns, vocabulary, prohibited phrases), (2) Conversational flow architecture for 10 core intents, (3) Error and edge case handling library (20 scenarios), (4) Escalation protocol to human, (5) Performance metrics framework (task completion rate, NPS, containment rate), (6) A/B testing plan for voice personality variants."
      },
      {
        title: "Generative Music System Design",
        useCase: "AI Music / Generative Art",
        level: "advanced",
        prompt: "Design a generative music system for [APPLICATION: e.g., a meditation app / video game / ambient installation]. Specify: (1) Compositional rules and constraints (scale, rhythm parameters, harmonic progression boundaries), (2) Randomization and variation algorithms, (3) User/environment input variables that affect the output, (4) Emotional mapping from inputs to musical parameters, (5) Technical implementation approach (MIDI, audio engine, AI model type), (6) Quality evaluation criteria for generative outputs."
      },
      {
        title: "Annual Podcast Content & Business Strategy",
        useCase: "Podcast Growth",
        level: "advanced",
        prompt: "Build a complete annual strategy for '[PODCAST NAME]' in the [NICHE] space with [CURRENT DOWNLOADS] monthly downloads. Cover: (1) Content pillars and episode mix for 52 weeks, (2) Guest booking strategy and criteria, (3) SEO and discoverability optimization, (4) Community building and listener engagement system, (5) Revenue diversification roadmap across 5 streams, (6) Cross-platform content repurposing workflow, (7) Team and production scale-up plan, (8) Quarterly OKRs with specific targets."
      }
    ]
  },

  /* ============================================================
     DESIGN
     ============================================================ */
  "Design": {
    free: [
      {
        title: "Logo Design Brief",
        useCase: "Branding",
        prompt: "Create a logo design brief for [COMPANY NAME], a [TYPE OF BUSINESS] in the [INDUSTRY] industry. The brand is [3 ADJECTIVES: e.g., innovative, trustworthy, bold]. Target audience: [AUDIENCE]. Include: design direction, color palette (with rationale), typography mood, reference logos we like (describe 3), and what to absolutely avoid. Deliverables needed: primary logo, icon-only version, and monochrome version."
      },
      {
        title: "UI/UX Screen Wireframe Description",
        useCase: "Product Design",
        prompt: "Describe the wireframe layout for the [SCREEN NAME: e.g., user dashboard / onboarding screen / checkout page] of a [TYPE OF APP]. Include: above-the-fold content, navigation structure, primary CTA placement, secondary information hierarchy, and any micro-interaction notes. Optimize for [MOBILE/DESKTOP]. Write it as a detailed spec a designer can use to build from."
      },
      {
        title: "Presentation Slide Design Direction",
        useCase: "Presentations",
        prompt: "Give me the visual design direction for a [X]-slide presentation for [PURPOSE: e.g., investor pitch / sales deck / keynote] representing [BRAND]. Specify: slide master design (colors, fonts, spacing), layout grid, how to handle data visualizations, icon style, photography style, and 5 layout templates to include (title, agenda, section break, content, and closing slide)."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Color Palette Generator Brief",
        useCase: "Visual Identity",
        level: "beginner",
        prompt: "Generate a 5-color brand palette for a company in the [INDUSTRY] space that wants to feel [3 BRAND ADJECTIVES]. For each color: hex code suggestion, when to use it (primary/secondary/accent/neutral/background), and the psychological meaning of the color in this context."
      },
      {
        title: "Simple Flyer Layout",
        useCase: "Event / Marketing",
        level: "beginner",
        prompt: "Describe the layout for a [EVENT/PROMOTION] flyer for [BRAND NAME]. Event/offer: [DETAILS]. Include: headline placement, subheadline, key info hierarchy (date, time, location or offer details), call to action, visual background suggestion, and font style recommendation. Portrait format, A4/letter size."
      },
      {
        title: "Icon Set Design Brief",
        useCase: "UI Design",
        level: "beginner",
        prompt: "Write a design brief for a set of 10 UI icons for a [TYPE OF APP/WEBSITE]. The icons represent: [LIST 10 FUNCTIONS]. Style: [FILLED/OUTLINED/DUOTONE]. Size: 24×24px. Color: [BRAND COLORS]. Consistency rules: corner radius, stroke weight, and visual weight guidelines."
      },
      {
        title: "Packaging Label Design",
        useCase: "Product Design",
        level: "beginner",
        prompt: "Describe the label design for [PRODUCT NAME], a [TYPE OF PRODUCT] by [BRAND NAME]. Include: front label layout (logo placement, product name, key descriptor), back label content hierarchy (ingredients, instructions, disclaimers), color scheme, font personality, and any illustrations or patterns to include."
      },
      {
        title: "Business Card Design Brief",
        useCase: "Print Design",
        level: "beginner",
        prompt: "Create a design brief for a business card for [NAME, TITLE] at [COMPANY]. Brand colors: [COLORS]. Information to include: name, title, email, phone, website, LinkedIn. Design direction: [MINIMAL/BOLD/CREATIVE]. Front and back layout description. Card size: 3.5×2 inches. Finish: [MATTE/GLOSS/SPOT UV]."
      },
      {
        title: "App Icon Design Direction",
        useCase: "Mobile App",
        level: "beginner",
        prompt: "Write a design direction for a mobile app icon for '[APP NAME]', an app that [WHAT IT DOES]. The icon should communicate [CORE VALUE: e.g., speed, safety, creativity] at a glance. Background color: [COLOR]. Icon symbol concept: [DESCRIBE]. Style: [FLAT/3D/ILLUSTRATED]. Must look great at 60px and 1024px. No text."
      },
      {
        title: "Newsletter Template Design",
        useCase: "Email Design",
        level: "beginner",
        prompt: "Describe the design layout for an HTML email newsletter template for [BRAND NAME]. Sections: header (logo + nav links), hero image area, main story section (1 column), 3-column feature grid, CTA button, footer (unsubscribe, social links). Max width: 600px. Colors: [BRAND COLORS]. Font stack: [FONTS]."
      },
      {
        title: "Menu Design Brief (Restaurant)",
        useCase: "Restaurant / Hospitality",
        level: "beginner",
        prompt: "Create a design brief for a restaurant menu for [RESTAURANT NAME], a [CUISINE TYPE] restaurant with a [VIBE: e.g., upscale casual / fine dining / street food] atmosphere. Menu sections: [LIST SECTIONS]. Color palette: [COLORS]. Typography: [STYLE]. Paper size: [SIZE]. Laminated or printed? Special design elements: [E.g., illustrations, photos, patterns]."
      },
      {
        title: "Infographic Layout Plan",
        useCase: "Content Marketing",
        level: "beginner",
        prompt: "Plan the layout for an infographic about '[TOPIC]'. Include: title section, 5 data/information sections each with an icon concept, data visualization type for each section (bar chart, pie, timeline, comparison, etc.), color coding system, and footer with source citations. Vertical format. Target platform: [BLOG/SOCIAL/PRINT]."
      },
      // INTERMEDIATE (12)
      {
        title: "Full Brand Style Guide",
        useCase: "Brand Management",
        level: "intermediate",
        prompt: "Write a comprehensive brand style guide for [BRAND NAME]. Sections: (1) Brand story and values, (2) Logo usage rules (clear space, minimum size, color versions, misuse examples), (3) Color system (primary, secondary, tints with hex/RGB/CMYK), (4) Typography system (display, body, UI fonts with weights and sizes), (5) Photography style, (6) Iconography guidelines, (7) Voice and tone, (8) Application examples (business card, website, social, ad). 20+ pages outline."
      },
      {
        title: "UX Research Synthesis",
        useCase: "UX Research",
        level: "intermediate",
        prompt: "Synthesize UX research findings from [X] user interviews about [PRODUCT/FEATURE]. From the following notes: [PASTE NOTES]. Identify: (1) Top 5 user pain points ranked by frequency, (2) User mental models and expectations, (3) Key quotes that illuminate each pain point, (4) Opportunities for design improvement, (5) Recommended UX changes with priority ranking, (6) Hypotheses to test in the next sprint."
      },
      {
        title: "Design System Component Spec",
        useCase: "Design Systems",
        level: "intermediate",
        prompt: "Write the design spec for the '[COMPONENT NAME]' component in [BRAND]'s design system. Include: component anatomy (all parts labeled), state variants (default, hover, focus, active, disabled, error), size variants, spacing tokens, color tokens, accessibility requirements (WCAG AA), usage guidelines (when to use/not use), and code implementation notes for developers."
      },
      {
        title: "Landing Page Design Brief",
        useCase: "Conversion Design",
        level: "intermediate",
        prompt: "Write a design brief for a high-converting landing page for [PRODUCT/OFFER]. Target audience: [AUDIENCE]. Goal: [CONVERSION GOAL]. Above the fold: [HEADLINE + SUBHEADLINE + HERO IMAGE CONCEPT + CTA]. Page sections: social proof bar, features section, benefits section, how it works, testimonials, FAQ, final CTA. Design principles: [STYLE DIRECTION]. Trust signals to include: [LIST]."
      },
      {
        title: "Dashboard UX Design Spec",
        useCase: "Data Products",
        level: "intermediate",
        prompt: "Specify the UX design for a [TYPE] analytics dashboard for [USER ROLE: e.g., marketing manager / operations lead]. Key metrics to surface: [LIST 6 METRICS]. Layout: prioritize [TOP 3 METRICS] above the fold. Include: date range selector, filter system, data visualization types per metric, alert/threshold highlighting, export functionality, and mobile responsiveness approach."
      },
      {
        title: "Motion Design Brief",
        useCase: "Animation / Motion",
        level: "intermediate",
        prompt: "Create a motion design brief for [PROJECT: e.g., logo animation / UI transitions / explainer animation]. Duration: [X SECONDS]. Style: [FLAT/3D/KINETIC TYPOGRAPHY/MIXED]. Movement principles: [EASE TYPE, SPEED, PERSONALITY]. Color palette: [COLORS]. Sound design: [YES/NO — if yes, mood]. Deliverables: [FORMATS NEEDED: MP4, GIF, Lottie JSON]. Platform: [WHERE IT WILL BE USED]."
      },
      {
        title: "Accessibility Audit Framework",
        useCase: "Inclusive Design",
        level: "intermediate",
        prompt: "Conduct an accessibility design audit for [PRODUCT/WEBSITE NAME] against WCAG 2.1 AA standards. Check and report on: (1) Color contrast ratios for all text and UI elements, (2) Keyboard navigation flow, (3) Screen reader compatibility (ARIA labels, roles, live regions), (4) Focus indicator visibility, (5) Error identification and recovery, (6) Touch target sizes (mobile), (7) Form accessibility. For each issue found, provide the specific fix needed."
      },
      {
        title: "E-commerce Product Page Design",
        useCase: "E-commerce",
        level: "intermediate",
        prompt: "Design the UX layout for a high-converting e-commerce product page for [PRODUCT TYPE] on [BRAND]'s site. Specify: image gallery approach, product name and pricing display, trust badges placement, variant selectors, quantity and add-to-cart CTA design, product description hierarchy, reviews section, related products, and sticky add-to-cart behavior on mobile. Address cart abandonment psychology."
      },
      {
        title: "Design Sprint Facilitation Plan",
        useCase: "Design Process",
        level: "intermediate",
        prompt: "Plan a 5-day design sprint for [COMPANY] to solve [DESIGN CHALLENGE]. For each day: core activity, tools needed, team roles, time blocks, expected outputs, and decision criteria. Include: challenge statement template, HMW (How Might We) exercise, storyboarding approach, prototype fidelity level, and user testing script for Day 5."
      },
      {
        title: "App Onboarding Flow Design",
        useCase: "Mobile UX",
        level: "intermediate",
        prompt: "Design the onboarding flow for [APP NAME] that helps [TARGET USER] achieve [CORE VALUE]. Maximum 5 onboarding screens. For each screen: headline, supporting copy, visual/illustration concept, interaction mechanic, and progress indicator design. Include: permission request timing strategy, personalization questions (max 2), and first 'aha moment' delivery target (within 3 minutes of sign-up)."
      },
      {
        title: "Print Campaign Design Direction",
        useCase: "Print Advertising",
        level: "intermediate",
        prompt: "Write a design direction for a [X]-piece print advertising campaign for [BRAND] promoting [PRODUCT/CAMPAIGN]. Formats: [LIST FORMATS: billboard, half-page print ad, direct mail postcard, etc.]. Campaign concept: [DESCRIBE VISUAL CONCEPT]. Consistency elements across all pieces: [DESCRIBE]. Headline approach: [COPY DIRECTION]. Photography vs. illustration direction."
      },
      {
        title: "Game UI Design Spec",
        useCase: "Game Design",
        level: "intermediate",
        prompt: "Design the UI system for a [GAME GENRE] game called '[GAME NAME]'. Specify: HUD elements (health, score, minimap placement), main menu design concept, inventory/item UI layout, notification and tooltip system, font choices for readability during gameplay, color-blind accessibility approach, and tutorial overlay design. Art direction: [VISUAL STYLE]."
      },
      // ADVANCED (9)
      {
        title: "Enterprise Design System Architecture",
        useCase: "Design Systems at Scale",
        level: "advanced",
        prompt: "Architect a scalable design system for [COMPANY] with [X] products and [X] designers/developers. Cover: (1) Tokenization strategy (primitive → semantic → component tokens), (2) Component taxonomy and naming conventions, (3) Multi-brand/multi-product theming architecture, (4) Contribution model and governance, (5) Documentation system, (6) Design-to-code handoff workflow, (7) Versioning and deprecation policy, (8) Adoption measurement framework."
      },
      {
        title: "Full Service UX Audit",
        useCase: "UX Consulting",
        level: "advanced",
        prompt: "Perform a comprehensive UX audit of [PRODUCT/WEBSITE URL or DESCRIPTION]. Evaluate against: (1) Nielsen's 10 Usability Heuristics, (2) Conversion rate optimization principles, (3) Mobile experience, (4) Performance perception, (5) Trust and credibility signals, (6) Accessibility (WCAG 2.1 AA), (7) Information architecture. For each issue: severity rating (1–5), screenshot area reference, diagnosis, and recommended fix with implementation effort estimate."
      },
      {
        title: "AI-Augmented Design Workflow",
        useCase: "Design Operations",
        level: "advanced",
        prompt: "Design an AI-augmented creative workflow for a [SIZE] design team at [TYPE OF COMPANY]. Map: (1) Current workflow pain points, (2) AI tool integration points (research, ideation, production, QA), (3) Human-AI collaboration protocols for each stage, (4) Quality control gates, (5) Prompt libraries for each workflow stage, (6) Ethical guidelines for AI-generated assets, (7) Team upskilling plan, (8) ROI measurement framework."
      },
      {
        title: "Cross-Cultural Design Strategy",
        useCase: "Global Product Design",
        level: "advanced",
        prompt: "Develop a cross-cultural design strategy for [PRODUCT] launching in [TARGET MARKETS: list 3–5]. For each market: (1) Cultural color and symbol sensitivities, (2) Typography and script requirements, (3) Layout direction (LTR/RTL) and reading patterns, (4) UI content density preferences, (5) Trust signal differences, (6) Payment and e-commerce UX norms, (7) Required localization adaptations. Include a global-local framework for maintaining brand consistency."
      },
      {
        title: "Speculative / Futuristic UX Design",
        useCase: "Innovation Design",
        level: "advanced",
        prompt: "Design a speculative UX concept for [PRODUCT/SERVICE] as it might exist in 2030. Assume: [LIST 3 TECHNOLOGY ASSUMPTIONS: e.g., ambient AI, spatial computing, brain-computer interfaces]. Explore: (1) New interaction paradigms that replace touchscreen, (2) How the user's context-awareness changes the UI, (3) Privacy and agency design principles in an AI-saturated world, (4) Three speculative UI screens with detailed description, (5) Ethical design considerations. Format as a design fiction document."
      },
      {
        title: "Design Leadership Strategy",
        useCase: "Design Management",
        level: "advanced",
        prompt: "Develop a 12-month design leadership strategy for a newly appointed VP of Design at [TYPE OF COMPANY] with [X] designers. Cover: (1) 30-60-90 day plan, (2) Team capability assessment and growth plan, (3) Design maturity model and roadmap, (4) Stakeholder alignment strategy, (5) Design metrics and OKRs, (6) Process and tooling standardization, (7) Culture of critique and psychological safety, (8) Business impact communication framework."
      },
      {
        title: "Physical-Digital Hybrid Experience Design",
        useCase: "Omnichannel / Retail Tech",
        level: "advanced",
        prompt: "Design a seamless physical-digital hybrid experience for [BRAND] in [CONTEXT: e.g., retail store / event / healthcare setting]. Map: (1) Customer journey touchpoints (physical + digital), (2) Technology integration (IoT, AR, digital signage, mobile), (3) Data flow between physical interactions and digital profiles, (4) Personalization moments, (5) Accessibility requirements, (6) Staff interaction design, (7) Privacy-preserving data collection approach, (8) Success metrics."
      },
      {
        title: "Generative Design System",
        useCase: "AI Design",
        level: "advanced",
        prompt: "Architect a generative design system for [BRAND] that can produce infinite on-brand visual variations using AI. Specify: (1) Core design DNA (invariable elements that define brand identity), (2) Variable parameters (color variations, layout logic, imagery rules), (3) AI model/tool integration for generation, (4) Brand consistency scoring rubric, (5) Human review protocol, (6) Training data curation approach, (7) Output format requirements, (8) Use case rollout (social media, ads, personalized emails)."
      },
      {
        title: "Design Ethics Framework",
        useCase: "Responsible Design",
        level: "advanced",
        prompt: "Create a design ethics framework for [COMPANY/PRODUCT TYPE] that builds ethical decision-making into the design process. Cover: (1) Core ethical principles for this product context, (2) Dark pattern identification and prohibition list, (3) Vulnerable user protection protocols, (4) Persuasion vs. manipulation boundary guidelines, (5) Data visualization honesty standards, (6) Algorithmic bias review process in design decisions, (7) Ethics review integration into design sprints, (8) Reporting and accountability mechanisms."
      }
    ]
  },

  /* ============================================================
     SEO
     ============================================================ */
  "SEO": {
    free: [
      {
        title: "Keyword Research Strategy",
        useCase: "SEO Planning",
        prompt: "Perform a keyword research strategy for [WEBSITE/BUSINESS] in the [NICHE] space. Identify: 5 primary keywords (high volume, moderate competition), 10 long-tail keywords (low competition, high intent), 5 question-based keywords for featured snippets, and 3 competitor gap keywords. For each keyword, provide: estimated monthly searches, difficulty rating (easy/medium/hard), search intent (informational/commercial/transactional), and a recommended content format."
      },
      {
        title: "On-Page SEO Checklist",
        useCase: "On-Page Optimization",
        prompt: "Audit and provide on-page SEO recommendations for a page targeting the keyword '[TARGET KEYWORD]'. The page is about [PAGE DESCRIPTION]. Check and optimize: title tag (under 60 chars, keyword placement), meta description (150–160 chars with CTA), H1 and heading structure, keyword density and placement, internal linking opportunities (3 suggestions), image alt text, page speed considerations, and schema markup recommendations."
      },
      {
        title: "SEO Blog Post Brief",
        useCase: "Content SEO",
        prompt: "Create an SEO content brief for a blog post targeting the keyword '[TARGET KEYWORD]' (search volume: [X]/mo, difficulty: [SCORE]). Include: recommended title, URL slug, meta description, content outline with H2s and H3s, key questions to answer (People Also Ask), competitor analysis notes (top 3 ranking pages), word count target, internal links to include, and the primary CTA."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Local SEO Optimization",
        useCase: "Local Business SEO",
        level: "beginner",
        prompt: "Create a local SEO optimization checklist for [BUSINESS NAME], a [TYPE OF BUSINESS] located in [CITY/REGION]. Cover: Google Business Profile optimization, local keyword targeting (city + service combos), NAP consistency, local citation building (5 key directories), review generation strategy, and location page content structure."
      },
      {
        title: "Meta Tag Generator",
        useCase: "Technical SEO",
        level: "beginner",
        prompt: "Write optimized meta tags for the following page: Page URL: [URL]. Page topic: [TOPIC]. Primary keyword: [KEYWORD]. Write: (1) Title tag (50–60 chars, keyword near front), (2) Meta description (150–160 chars, includes keyword, CTA), (3) OG:title and OG:description for social sharing, (4) 5 relevant meta keywords (for reference, not SEO value)."
      },
      {
        title: "Internal Linking Strategy",
        useCase: "On-Page SEO",
        level: "beginner",
        prompt: "Build an internal linking strategy for a website about [NICHE] with the following pages: [LIST 10 MAIN PAGES]. Create a linking map showing: which pages should link to which, anchor text recommendations for each link, pillar page identification, and priority links to add first. Goal: improve crawlability and pass authority to [TARGET PAGE]."
      },
      {
        title: "Google Business Profile Post",
        useCase: "Local SEO",
        level: "beginner",
        prompt: "Write 4 Google Business Profile posts for [BUSINESS NAME] — one for each post type: (1) What's New (highlight a product/service), (2) Event (promote an upcoming event), (3) Offer (a special deal with CTA), (4) Product feature. Each post: 150–300 words, include a CTA, and use local keywords naturally."
      },
      {
        title: "404 and Redirect Audit Brief",
        useCase: "Technical SEO",
        level: "beginner",
        prompt: "Create a process for auditing and fixing 404 errors and redirect chains for [WEBSITE URL]. Include: how to find 404s (tools to use), how to prioritize by traffic and backlinks, redirect mapping template, redirect chain identification and flattening guide, and 301 vs. 302 redirect usage guide."
      },
      {
        title: "FAQ Schema Generator",
        useCase: "Schema Markup",
        level: "beginner",
        prompt: "Write 5 FAQ questions and answers for the topic '[TOPIC]' optimized for Google's FAQ featured snippet. For each Q&A: question (under 60 chars), answer (50–300 words, direct and authoritative), and the FAQ schema JSON-LD markup code for each. Ensure questions match common 'People Also Ask' patterns for this topic."
      },
      {
        title: "Competitor Backlink Analysis Brief",
        useCase: "Link Building",
        level: "beginner",
        prompt: "Describe how to conduct a competitor backlink analysis for [MY WEBSITE] against competitors [COMPETITOR 1], [COMPETITOR 2], [COMPETITOR 3]. Include: tools to use, metrics to evaluate (DA, DR, link type, anchor text), how to find link gaps, and a prioritized list of 10 actionable link-building opportunities based on where competitors have links but I don't."
      },
      {
        title: "Image SEO Optimization Guide",
        useCase: "Image SEO",
        level: "beginner",
        prompt: "Write an image SEO optimization guide for [WEBSITE TYPE]. Cover: file naming conventions (keyword-rich, hyphenated), alt text formula with examples, file format selection (JPEG/WebP/PNG use cases), compression targets for web performance, lazy loading implementation, structured data for images, and a checklist to use when uploading any new image."
      },
      {
        title: "SEO Audit Report Template",
        useCase: "SEO Reporting",
        level: "beginner",
        prompt: "Create an SEO audit report template for [WEBSITE URL]. Sections: Executive Summary, Technical SEO (crawlability, indexation, site speed, mobile, HTTPS), On-Page SEO (title tags, metas, headings, content quality), Off-Page SEO (backlink profile, DA, toxic links), Competitor Comparison, Top 10 Priority Fixes ranked by impact, and a 90-day action plan."
      },
      // INTERMEDIATE (12)
      {
        title: "SEO Content Calendar (90 Days)",
        useCase: "Content SEO",
        level: "intermediate",
        prompt: "Build a 90-day SEO content calendar for [WEBSITE] in the [NICHE] space. Include 12 blog posts: for each post specify target keyword, search intent, title, word count, internal link targets, and publish date. Organize by content type: 4 pillar/cornerstone pages, 6 cluster content pieces, 2 linkable assets (data study or tool). Align with [SEASONAL EVENTS/PRODUCT LAUNCHES] in the calendar."
      },
      {
        title: "E-E-A-T Optimization Plan",
        useCase: "Content Authority",
        level: "intermediate",
        prompt: "Develop an E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) optimization plan for [WEBSITE] in the [INDUSTRY/NICHE]. For each E-E-A-T signal: assess the current state, identify gaps, and provide 3 specific action items. Include: author bio requirements, citation and source standards, trust signal additions (reviews, credentials, transparency pages), and a priority implementation timeline."
      },
      {
        title: "Technical SEO Roadmap",
        useCase: "Technical SEO",
        level: "intermediate",
        prompt: "Create a 6-month technical SEO roadmap for [WEBSITE]. Month-by-month focus areas: Month 1 (crawl budget and indexation), Month 2 (Core Web Vitals and page speed), Month 3 (structured data implementation), Month 4 (internal linking architecture), Month 5 (international SEO/hreflang if applicable), Month 6 (log file analysis and advanced crawl audit). For each month: specific tasks, tools, and success metrics."
      },
      {
        title: "Link Building Outreach Campaign",
        useCase: "Link Building",
        level: "intermediate",
        prompt: "Design a link building outreach campaign for [WEBSITE] targeting [X] new backlinks in [TIMEFRAME]. Cover: (1) Link building strategy type (guest post, broken link, skyscraper, digital PR), (2) Target site criteria (DA/DR thresholds, relevance, traffic), (3) Prospecting process with tools, (4) Outreach email template (3 variations), (5) Follow-up sequence (3 emails), (6) Tracking spreadsheet structure, (7) Success metrics and KPIs."
      },
      {
        title: "Core Web Vitals Optimization Brief",
        useCase: "Page Speed SEO",
        level: "intermediate",
        prompt: "Write a Core Web Vitals optimization brief for [WEBSITE URL]. Address: (1) LCP (Largest Contentful Paint) — identify likely LCP element and top 5 fixes, (2) FID/INP (Interaction to Next Paint) — JavaScript optimization priorities, (3) CLS (Cumulative Layout Shift) — layout stability fixes. For each: current benchmark targets (Good: LCP <2.5s, INP <200ms, CLS <0.1), diagnostic approach, implementation fixes ranked by effort vs. impact."
      },
      {
        title: "Programmatic SEO Blueprint",
        useCase: "Scale SEO",
        level: "intermediate",
        prompt: "Design a programmatic SEO strategy for [WEBSITE] to create [X] pages at scale. Target keyword pattern: [KEYWORD TEMPLATE: e.g., 'best [tool] for [use case]']. Specify: (1) Page template structure (sections, content blocks), (2) Data sources to power content variation, (3) Quality differentiation strategy (avoid thin content), (4) URL structure, (5) Internal linking logic, (6) Indexation strategy (crawl budget management), (7) Performance monitoring for programmatic pages."
      },
      {
        title: "YouTube SEO Strategy",
        useCase: "Video SEO",
        level: "intermediate",
        prompt: "Build a YouTube SEO strategy for [CHANNEL NAME] in the [NICHE] space targeting [AUDIENCE]. Cover: (1) Keyword research approach (YouTube Search, Google, TubeBuddy/VidIQ), (2) Title formula with CTR optimization, (3) Description template (first 2 lines, keywords, timestamps, links), (4) Tag strategy, (5) Thumbnail A/B testing protocol, (6) Chapter markers optimization, (7) Playlist architecture, (8) Cross-promotion with website for authority signals."
      },
      {
        title: "SEO for AI Overviews (SGE)",
        useCase: "AI Search Optimization",
        level: "intermediate",
        prompt: "Develop a strategy to optimize [WEBSITE] content for Google's AI Overviews (SGE). Cover: (1) Content types most likely to be cited in AI Overviews, (2) Structured content formatting (definitions, lists, comparisons, FAQs), (3) Schema markup priorities, (4) Content freshness signals, (5) Source authority building, (6) How to monitor AI Overview inclusion/exclusion, (7) Query intent mapping for conversational AI search patterns."
      },
      {
        title: "International SEO Strategy",
        useCase: "Global SEO",
        level: "intermediate",
        prompt: "Create an international SEO strategy for [WEBSITE] expanding to [TARGET MARKETS]. Cover: (1) URL structure recommendation (ccTLD/subdomain/subdirectory) with rationale, (2) Hreflang implementation plan, (3) Content localization vs. translation approach, (4) Local keyword research process for each market, (5) Local link building strategy, (6) Technical setup checklist, (7) Market prioritization and rollout timeline."
      },
      {
        title: "SEO ROI Report Framework",
        useCase: "SEO Analytics",
        level: "intermediate",
        prompt: "Build an SEO ROI reporting framework for [CLIENT/COMPANY]. Include: (1) KPI dashboard (traffic, rankings, conversions, revenue attribution), (2) Attribution model for SEO conversions, (3) Monthly report structure, (4) Quarterly business review slide template, (5) Benchmark setting process, (6) How to tie SEO activity to revenue (CLV × conversion rate × organic traffic growth), (7) Storytelling framework for presenting SEO results to non-technical stakeholders."
      },
      {
        title: "Content Pruning & Consolidation Strategy",
        useCase: "Content Audit",
        level: "intermediate",
        prompt: "Design a content pruning and consolidation strategy for [WEBSITE] which has [X] published pages. Process: (1) Full content inventory approach, (2) Decision matrix (keep/update/consolidate/delete criteria), (3) Traffic and conversion data analysis, (4) Keyword cannibalization identification, (5) Consolidation redirect mapping, (6) Updated content quality standards, (7) Implementation order and timeline, (8) Post-pruning monitoring plan."
      },
      {
        title: "Featured Snippet Optimization",
        useCase: "SERP Features",
        level: "intermediate",
        prompt: "Develop a featured snippet optimization strategy for [WEBSITE] targeting [TOPIC AREA]. Identify: (1) 10 target queries with snippet opportunity (paragraph, list, table, video), (2) Content format requirements for each snippet type, (3) Template for writing snippet-optimized content blocks, (4) Header structure best practices, (5) Answer length guidelines per snippet type, (6) Tracking method to monitor snippet wins/losses."
      },
      // ADVANCED (9)
      {
        title: "Enterprise SEO Program Design",
        useCase: "Enterprise SEO",
        level: "advanced",
        prompt: "Design an enterprise SEO program for [COMPANY] with a [X]-page website across [X] markets. Cover: (1) SEO team structure and roles, (2) Technology stack (crawl, analytics, rank tracking, content), (3) Cross-functional stakeholder alignment process (Engineering, Content, Product, Legal), (4) Governance and quality control framework, (5) Quarterly OKR framework with SEO-to-revenue attribution, (6) Advanced automation opportunities, (7) Testing and experimentation framework, (8) Annual SEO budget justification model."
      },
      {
        title: "AI-First SEO Architecture",
        useCase: "Future-Proof SEO",
        level: "advanced",
        prompt: "Architect an AI-first SEO content strategy for [WEBSITE] to thrive in a world where AI Overviews, Perplexity, and ChatGPT answer queries directly. Cover: (1) Content types that AI tools will cite (authoritative, original data, expert opinion), (2) Technical signals that AI crawlers value, (3) Brand search dominance strategy, (4) 'Answer Engine Optimization' tactics, (5) Original research and data creation plan, (6) Entity building and knowledge graph optimization, (7) Measuring success in a zero-click world."
      },
      {
        title: "Competitive SEO Domination Strategy",
        useCase: "Competitive SEO",
        level: "advanced",
        prompt: "Build a comprehensive strategy to outrank [COMPETITOR DOMAIN] for the keyword cluster around [MAIN TOPIC]. Reverse-engineer their SEO: (1) Full backlink profile analysis and gap list, (2) Content gap analysis (their top pages, missing topics), (3) Technical advantage identification, (4) SERP feature ownership comparison, (5) Domain authority building path, (6) Content velocity and quality comparison, (7) 12-month attack plan with quarterly milestones and predicted ranking timeline."
      },
      {
        title: "SEO A/B Testing Framework",
        useCase: "SEO Experimentation",
        level: "advanced",
        prompt: "Build an SEO A/B testing framework for [WEBSITE]. Cover: (1) Types of SEO tests (title tags, meta descriptions, content changes, structured data), (2) Proper test design to isolate SEO variables (page split vs. time split), (3) Statistical significance requirements, (4) Control group methodology, (5) Test duration guidelines, (6) Measurement approach (GSC click data, rank tracking, traffic), (7) Decision criteria for rolling out or reverting changes, (8) A library of 10 high-priority test ideas for [SITE TYPE]."
      },
      {
        title: "SEO Due Diligence for M&A",
        useCase: "SEO for Business Transactions",
        level: "advanced",
        prompt: "Conduct an SEO due diligence assessment for acquiring [WEBSITE]. Evaluate: (1) Organic traffic quality and sustainability (traffic concentration risk, branded vs. non-branded), (2) Algorithmic penalty history (Google penalties, manual actions), (3) Backlink profile quality (toxic links, link velocity, anchor text distribution), (4) Technical debt assessment, (5) Content quality and E-E-A-T strength, (6) Keyword ranking risks (algorithm sensitivity, AI Overview exposure), (7) Revenue attribution to SEO, (8) Post-acquisition growth potential. Summarize as investment risk rating."
      },
      {
        title: "Semantic SEO Architecture",
        useCase: "Advanced On-Page SEO",
        level: "advanced",
        prompt: "Design a semantic SEO content architecture for [WEBSITE] targeting the topic cluster of [MAIN TOPIC]. Cover: (1) Topical authority mapping (all subtopics and entities to own), (2) Content depth requirements per topic tier, (3) Entity optimization (people, places, concepts, organizations to mention), (4) Semantic co-occurrence analysis for [TOP 3 TARGET KEYWORDS], (5) Knowledge graph entity strengthening tactics, (6) NLP optimization guidelines for content writers, (7) Internal link anchor text strategy for semantic signals."
      },
      {
        title: "SEO Penalty Recovery Plan",
        useCase: "SEO Recovery",
        level: "advanced",
        prompt: "Create a penalty recovery plan for [WEBSITE] that experienced a [X%] traffic drop on [DATE] — potentially aligned with [ALGORITHM UPDATE NAME]. Process: (1) Traffic analysis to identify affected pages and query types, (2) Algorithm update pattern matching, (3) Toxic backlink audit and disavow strategy, (4) Content quality audit against helpful content guidelines, (5) E-E-A-T strengthening actions, (6) Technical issue diagnosis, (7) Recovery timeline and milestones, (8) Prevention measures for future algorithm updates."
      },
      {
        title: "B2B SEO Demand Generation Integration",
        useCase: "B2B SEO",
        level: "advanced",
        prompt: "Build an integrated B2B SEO + demand generation strategy for [COMPANY] selling [PRODUCT/SERVICE] to [ICP: BUYER TITLE] at [COMPANY SIZE/TYPE] companies. Map: (1) Keyword strategy by buyer journey stage (awareness/consideration/decision), (2) Content formats that match B2B buyer behavior, (3) ICP-specific landing pages, (4) SEO → MQL → SQL attribution model, (5) Sales enablement content with SEO value, (6) Account-based SEO targeting enterprise accounts, (7) Thought leadership content for dark funnel influence."
      },
      {
        title: "Full-Funnel SEO Content Strategy",
        useCase: "Revenue-Focused SEO",
        level: "advanced",
        prompt: "Build a full-funnel SEO content strategy for [COMPANY] that directly maps to revenue at each funnel stage. TOFU (awareness): [X] content pieces targeting informational keywords — audience, content type, CTAs to capture email. MOFU (consideration): [X] pieces targeting comparison/evaluation keywords — format, depth, conversion elements. BOFU (decision): [X] pages targeting transactional keywords — trust signals, conversion rate optimization. Attribution: how to track each piece to pipeline and closed revenue. Include 6-month content calendar and hiring/resource plan."
      }
    ]
  },

  /* ============================================================
     CODING  (merges "Code" + "Coding" categories)
     ============================================================ */
  "Coding": {
    free: [
      {
        title: "Debug This Code",
        useCase: "Debugging",
        prompt: "Debug the following [LANGUAGE] code. Find all bugs, explain what each bug is causing, and provide the corrected version. Also add brief comments explaining the key logic changes. Code: [PASTE CODE]"
      },
      {
        title: "Build a REST API Endpoint",
        useCase: "Backend Development",
        prompt: "Write a [LANGUAGE/FRAMEWORK: e.g., Node.js/Express, Python/FastAPI] REST API endpoint for [ENDPOINT PURPOSE: e.g., user authentication / product CRUD]. Include: route definition, request validation, business logic, error handling (400, 401, 404, 500 cases), and a sample request/response. Follow RESTful conventions and add JSDoc/docstring comments."
      },
      {
        title: "Convert Design to Code",
        useCase: "Frontend Development",
        prompt: "Convert this UI design description into clean [HTML/CSS/FRAMEWORK: e.g., React/Tailwind] code. Design: [DESCRIBE OR PASTE DESIGN SPECS]. Requirements: responsive (mobile-first), accessible (ARIA labels, semantic HTML), and following [COMPANY/PROJECT] coding conventions. Include all states: default, hover, focus, loading, empty."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Explain This Code",
        useCase: "Learning",
        level: "beginner",
        prompt: "Explain the following [LANGUAGE] code to someone who is a beginner programmer. Break it down line by line if needed, explain what each function does in plain English, and describe the overall purpose of the code. Also explain any programming concepts used: [PASTE CODE]"
      },
      {
        title: "Write a Simple Function",
        useCase: "Basic Coding",
        level: "beginner",
        prompt: "Write a simple [LANGUAGE] function that [DESCRIBE WHAT IT SHOULD DO]. The function should: accept [INPUT PARAMETERS], return [EXPECTED OUTPUT], handle edge cases (empty input, null, etc.), and include a docstring comment explaining usage. Also write 3 test cases."
      },
      {
        title: "CSS Styling Fix",
        useCase: "Frontend",
        level: "beginner",
        prompt: "Fix the following CSS issue: [DESCRIBE THE VISUAL PROBLEM]. Here is the current CSS and HTML: [PASTE CODE]. Explain why the issue is happening and provide the corrected CSS. Also suggest 1 improvement to make the code more maintainable."
      },
      {
        title: "SQL Query Writer",
        useCase: "Database",
        level: "beginner",
        prompt: "Write a SQL query to [DESCRIBE WHAT YOU NEED: e.g., find all users who signed up in the last 30 days and made at least one purchase]. Table structure: [DESCRIBE TABLES AND KEY COLUMNS]. Use standard SQL syntax compatible with [MYSQL/POSTGRESQL/SQLITE]. Include comments explaining each clause."
      },
      {
        title: "Git Command Helper",
        useCase: "Version Control",
        level: "beginner",
        prompt: "I need help with this Git task: [DESCRIBE WHAT YOU WANT TO DO: e.g., undo the last commit without losing changes / merge a feature branch / set up a .gitignore for a Node.js project]. Give me the exact commands to run in sequence, explain what each command does, and warn me about any risks."
      },
      {
        title: "README File Generator",
        useCase: "Documentation",
        level: "beginner",
        prompt: "Write a professional README.md file for a [LANGUAGE/FRAMEWORK] project called '[PROJECT NAME]'. The project does: [BRIEF DESCRIPTION]. Include sections: Project Description, Features, Tech Stack, Prerequisites, Installation, Usage with code examples, API Reference (if applicable), Contributing guide, and License. Use proper Markdown formatting."
      },
      {
        title: "Loop and Array Basics",
        useCase: "Learning",
        level: "beginner",
        prompt: "Show me how to solve this common programming task in [LANGUAGE]: [DESCRIBE TASK: e.g., filter an array of objects by a property / find the most common item in a list / group array items by category]. Provide: the code solution, a step-by-step explanation, an alternative approach, and a note on time complexity."
      },
      {
        title: "Form Validation Code",
        useCase: "Frontend",
        level: "beginner",
        prompt: "Write [LANGUAGE/FRAMEWORK] form validation for a [FORM TYPE: e.g., signup / checkout / contact] form. Fields to validate: [LIST FIELDS]. Validation rules: [e.g., email format, password min 8 chars with 1 number, phone number format]. Show error messages next to each field. Validate on submit and on blur. Accessible (ARIA error messages)."
      },
      {
        title: "API Integration Starter",
        useCase: "API Integration",
        level: "beginner",
        prompt: "Write the starter code to integrate the [API NAME] API into a [LANGUAGE/FRAMEWORK] project. Include: authentication setup, a basic GET request to [ENDPOINT], response parsing, error handling, and a simple example that prints/displays [SPECIFIC DATA FROM RESPONSE]. API docs reference: [PASTE KEY ENDPOINTS OR DOCS URL]."
      },
      // INTERMEDIATE (12)
      {
        title: "Refactor for Clean Code",
        useCase: "Code Quality",
        level: "intermediate",
        prompt: "Refactor the following [LANGUAGE] code to improve: readability, maintainability, DRY principles, and performance. Explain each refactoring decision. The code should maintain identical behavior. After refactoring, identify any remaining technical debt. Code: [PASTE CODE]"
      },
      {
        title: "Design Pattern Implementation",
        useCase: "Software Architecture",
        level: "intermediate",
        prompt: "Implement the [DESIGN PATTERN: e.g., Observer/Factory/Singleton/Strategy] pattern in [LANGUAGE] for this use case: [DESCRIBE USE CASE]. Provide: the full implementation, a diagram description of the pattern's structure, when to use vs. avoid this pattern, and a practical example with 3 real-world scenarios where it applies."
      },
      {
        title: "Unit Test Generator",
        useCase: "Testing",
        level: "intermediate",
        prompt: "Write comprehensive unit tests for the following [LANGUAGE] function using [TEST FRAMEWORK: e.g., Jest/PyTest/JUnit]: [PASTE FUNCTION]. Tests must cover: happy path, edge cases (empty, null, boundaries), error cases, and any async behavior. Aim for 100% branch coverage. Include setup/teardown where needed. Add a test coverage summary comment."
      },
      {
        title: "Database Schema Designer",
        useCase: "Database Architecture",
        level: "intermediate",
        prompt: "Design a database schema for [APPLICATION TYPE: e.g., e-commerce platform / SaaS app / social network]. Requirements: [LIST KEY FEATURES]. Create: all tables with columns (names, data types, constraints), primary and foreign keys, indexes for performance, and a migration file in [SQL DIALECT/ORM]. Explain normalization decisions and any denormalization trade-offs."
      },
      {
        title: "Authentication System",
        useCase: "Security",
        level: "intermediate",
        prompt: "Build a complete authentication system in [LANGUAGE/FRAMEWORK] with: user registration (with email verification), login (JWT + refresh tokens), password reset flow, session management, and rate limiting. Follow OWASP security guidelines. Include: database schema, API endpoints, middleware, and security considerations documented in comments."
      },
      {
        title: "Algorithm Optimization",
        useCase: "Performance",
        level: "intermediate",
        prompt: "Optimize the following algorithm in [LANGUAGE] for better time and space complexity. Current code: [PASTE CODE]. Current complexity: O([CURRENT]). Target: make it as efficient as possible. Provide: optimized solution, Big O analysis (before vs. after), explanation of the optimization technique used, and edge case handling."
      },
      {
        title: "CLI Tool Builder",
        useCase: "DevOps / Tooling",
        level: "intermediate",
        prompt: "Build a CLI tool in [LANGUAGE] called '[TOOL NAME]' that [DESCRIBE FUNCTIONALITY]. Features: [LIST 3–5 COMMANDS]. Include: argument parsing, help documentation (--help flag), colored output, error handling with exit codes, and a README with installation and usage instructions. Follow CLI UX best practices."
      },
      {
        title: "Data Pipeline Script",
        useCase: "Data Engineering",
        level: "intermediate",
        prompt: "Write a data pipeline script in [LANGUAGE] that: reads [DATA SOURCE: e.g., CSV/API/database], transforms the data by [TRANSFORMATION STEPS], validates data quality (check for nulls, type mismatches, outliers), and loads it to [DESTINATION: e.g., database/CSV/API]. Include: logging, error handling with retry logic, and a progress indicator. Handle datasets up to [SIZE]."
      },
      {
        title: "React Component Builder",
        useCase: "Frontend Development",
        level: "intermediate",
        prompt: "Build a reusable React component: '[COMPONENT NAME]'. Props: [LIST PROPS WITH TYPES]. Behavior: [DESCRIBE BEHAVIOR]. Requirements: TypeScript, responsive design, accessible (WCAG AA), unit tests with React Testing Library, and Storybook story. Follow atomic design principles. Include: PropTypes/interface, default props, and usage examples."
      },
      {
        title: "WebSocket Real-Time Feature",
        useCase: "Real-Time Development",
        level: "intermediate",
        prompt: "Implement a real-time [FEATURE: e.g., chat / live dashboard / collaborative editing] feature using WebSockets in [FRAMEWORK]. Include: server-side WebSocket handler, client-side connection management, reconnection logic, event types and message schema, broadcasting to rooms/channels, and error handling. Handle [X] concurrent connections."
      },
      {
        title: "Docker & CI/CD Setup",
        useCase: "DevOps",
        level: "intermediate",
        prompt: "Create a complete Docker and CI/CD setup for a [LANGUAGE/FRAMEWORK] application. Provide: Dockerfile (multi-stage build, optimized layers), docker-compose.yml (app + database + cache), GitHub Actions workflow (test → build → push to registry → deploy), environment variable management, and health check configuration. Target environment: [STAGING/PRODUCTION]."
      },
      {
        title: "Third-Party Service Integration",
        useCase: "Integration",
        level: "intermediate",
        prompt: "Integrate [SERVICE NAME: e.g., Stripe / Twilio / SendGrid / AWS S3] into a [LANGUAGE/FRAMEWORK] application. Implementation: authentication/SDK setup, the [PRIMARY FEATURE: e.g., payment processing / SMS sending / email delivery / file upload] core integration, webhook handling, error handling and retry logic, and test mode vs. production mode configuration. Include full code and unit tests."
      },
      // ADVANCED (9)
      {
        title: "Microservices Architecture Design",
        useCase: "System Architecture",
        level: "advanced",
        prompt: "Design a microservices architecture for [APPLICATION: e.g., e-commerce platform]. Define: (1) Service decomposition (which services, responsibilities, and boundaries), (2) Inter-service communication (REST/gRPC/message queue — justify each), (3) Data management (database per service, shared data strategies), (4) API gateway design, (5) Service discovery and load balancing, (6) Distributed tracing and logging, (7) Failure handling (circuit breaker, retry patterns), (8) Deployment topology. Include architecture diagram description."
      },
      {
        title: "Performance Optimization Audit",
        useCase: "Performance Engineering",
        level: "advanced",
        prompt: "Conduct a performance optimization audit of this [LANGUAGE/FRAMEWORK] application: [PASTE CODE OR DESCRIBE ARCHITECTURE]. Identify: (1) N+1 query problems, (2) Memory leaks and retention issues, (3) Synchronous blocking operations that should be async, (4) Caching opportunities (what to cache, TTL, invalidation strategy), (5) Database query optimization (missing indexes, slow queries), (6) Frontend bundle size issues, (7) Provide a prioritized fix list with estimated performance gain for each."
      },
      {
        title: "Security Penetration Test Plan",
        useCase: "Application Security",
        level: "advanced",
        prompt: "Design a security review and penetration testing plan for [APPLICATION TYPE]. Cover: (1) OWASP Top 10 vulnerability checks with test cases for each, (2) Authentication and session management testing, (3) API security testing (rate limiting, authorization bypass, injection), (4) Dependency vulnerability scanning approach, (5) Secret management audit, (6) CORS and CSP policy review, (7) Infrastructure security checklist, (8) Remediation priority framework. Include specific test payloads for top 5 vulnerability types."
      },
      {
        title: "ML Model Integration",
        useCase: "AI/ML Engineering",
        level: "advanced",
        prompt: "Architect the integration of a [MODEL TYPE: e.g., LLM / computer vision / recommendation engine] model into a production [LANGUAGE/FRAMEWORK] application. Cover: (1) Model serving architecture (self-hosted vs. API), (2) Request/response schema design, (3) Latency optimization (streaming, caching, async processing), (4) Cost optimization strategies, (5) Fallback handling when model is unavailable, (6) Prompt/input validation and sanitization, (7) Output validation and safety filtering, (8) Monitoring (latency, error rate, output quality), (9) A/B testing framework for model versions."
      },
      {
        title: "Distributed System Design",
        useCase: "System Design",
        level: "advanced",
        prompt: "Design a distributed system for [USE CASE: e.g., URL shortener / ride-sharing / social media feed] that handles [SCALE: e.g., 10M users, 100K RPS]. Cover: (1) Requirements clarification (functional + non-functional), (2) Capacity estimation, (3) High-level architecture, (4) Deep-dive into [CRITICAL COMPONENT], (5) Database choice and schema, (6) Caching strategy, (7) Message queue usage, (8) Handling failures and ensuring consistency (CAP theorem trade-offs), (9) Monitoring and alerting, (10) How to scale from MVP to 10× traffic."
      },
      {
        title: "Code Review Standards & Automation",
        useCase: "Engineering Culture",
        level: "advanced",
        prompt: "Design a comprehensive code review standards and automation framework for a [SIZE] engineering team working in [LANGUAGE/FRAMEWORK]. Cover: (1) Code review principles and checklist (security, performance, readability, test coverage), (2) Automated linting and formatting setup (config files), (3) Pre-commit hooks, (4) CI quality gates (coverage thresholds, complexity limits), (5) PR template, (6) Review SLA and escalation process, (7) How to give and receive feedback effectively, (8) Metrics to track code review health."
      },
      {
        title: "Real-Time Collaborative System",
        useCase: "Real-Time Systems",
        level: "advanced",
        prompt: "Architect a real-time collaborative editing system (like Google Docs) for [USE CASE]. Cover: (1) Conflict resolution algorithm (OT vs. CRDT — justify choice), (2) Client-server sync architecture, (3) Offline support and reconnection sync, (4) Presence indicators (who's editing what), (5) Version history and rollback, (6) Optimistic UI update approach, (7) Scalability for [X] simultaneous editors per document, (8) Data model and persistence strategy, (9) Technology stack recommendation."
      },
      {
        title: "Compiler / Interpreter Design",
        useCase: "Language Design",
        level: "advanced",
        prompt: "Design and implement the core components of a simple [LANGUAGE TYPE: e.g., expression evaluator / domain-specific language / scripting language] called '[LANGUAGE NAME]'. Implement: (1) Lexer/tokenizer with token definitions, (2) Parser producing an AST (Abstract Syntax Tree), (3) Evaluator/interpreter, (4) Basic standard library functions, (5) Error handling with meaningful messages. Language features: [LIST FEATURES]. Provide full working implementation in [IMPLEMENTATION LANGUAGE]."
      },
      {
        title: "Zero-Downtime Migration Strategy",
        useCase: "Database / Infrastructure",
        level: "advanced",
        prompt: "Design a zero-downtime migration strategy for [MIGRATION TASK: e.g., relational DB schema change / database engine switch / monolith to microservices split] for a system serving [X] requests/second. Cover: (1) Pre-migration preparation (backups, rollback plan), (2) Dual-write pattern implementation, (3) Data backfill strategy with progress tracking, (4) Traffic cutover approach (blue-green, canary), (5) Verification and validation checkpoints, (6) Rollback triggers and procedure, (7) Post-migration cleanup, (8) Estimated timeline and resource requirements."
      }
    ]
  },


  /* ============================================================
     MARKETING
     ============================================================ */
  "Marketing": {
    free: [
      {
        title: "Marketing Campaign Brief",
        useCase: "Campaign Planning",
        prompt: "Write a marketing campaign brief for [BRAND] launching [PRODUCT/OFFER] to [TARGET AUDIENCE]. Include: campaign objective (SMART goal), key message, value proposition, channels (3–4 channels with rationale), creative direction, budget allocation overview, timeline, and KPIs to measure success. Campaign name: '[CAMPAIGN NAME]'."
      },
      {
        title: "Customer Persona Profile",
        useCase: "Audience Research",
        prompt: "Build a detailed customer persona for [BRAND]'s ideal customer. Research and define: name and demographic snapshot, psychographics (values, lifestyle, interests), goals and aspirations, pain points and frustrations, buying triggers and objections, preferred content formats and platforms, and a 'day in the life' narrative. Use this data: [PASTE ANY AVAILABLE DATA OR DESCRIBE YOUR CUSTOMER]."
      },
      {
        title: "Growth Hacking Idea Generator",
        useCase: "Growth Marketing",
        prompt: "Generate 10 growth hacking ideas for [PRODUCT/STARTUP] to acquire [X] new users/customers in [TIMEFRAME] with a budget of [BUDGET]. Mix low-cost and creative tactics across: referral/viral loops, content virality, community building, partnership channels, and paid experiments. For each idea: tactic name, how it works, estimated cost, and potential reach."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Social Media Post Calendar",
        useCase: "Social Media Marketing",
        level: "beginner",
        prompt: "Create a 2-week social media content calendar for [BRAND] in the [INDUSTRY] space. Platforms: [PLATFORMS]. For each day: post idea, caption hook, content type (image/video/carousel/poll), and 3 hashtags. Mix content pillars: [EDUCATIONAL/ENTERTAINING/PROMOTIONAL/COMMUNITY] — no more than 30% promotional."
      },
      {
        title: "Ad Copy Variations",
        useCase: "Paid Advertising",
        level: "beginner",
        prompt: "Write 5 ad copy variations for [PRODUCT/SERVICE] targeting [AUDIENCE] on [PLATFORM: Facebook/Google/LinkedIn]. Each variation: headline (under 30 chars), description (under 90 chars), and primary text (under 125 chars). Test different angles: fear of missing out, social proof, benefit-led, question, and bold claim."
      },
      {
        title: "Referral Program Design",
        useCase: "Growth",
        level: "beginner",
        prompt: "Design a referral program for [PRODUCT/SERVICE]. Include: referral incentive structure (for both referrer and referee), program name and tagline, how sharing works, email invite template, landing page copy, and fraud prevention considerations. Goal: achieve [X] referral signups in [TIMEFRAME]."
      },
      {
        title: "Influencer Outreach Email",
        useCase: "Influencer Marketing",
        level: "beginner",
        prompt: "Write a cold outreach email to [INFLUENCER TYPE: e.g., micro-influencer / YouTuber / blogger] in the [NICHE] space for a collaboration with [BRAND NAME]. Include: personalized opener, value proposition for the influencer, what the collaboration involves, compensation offer, and a low-friction CTA. Keep it under 200 words."
      },
      {
        title: "Brand Tagline Generator",
        useCase: "Branding",
        level: "beginner",
        prompt: "Generate 10 tagline options for [BRAND NAME], a [TYPE OF COMPANY] that [CORE VALUE PROPOSITION]. Audience: [TARGET AUDIENCE]. Brand tone: [ADJECTIVES]. For each tagline: the line itself, the emotional hook it uses, and which use case it fits best (billboard / website / product packaging)."
      },
      {
        title: "Promotional SMS Campaign",
        useCase: "SMS Marketing",
        level: "beginner",
        prompt: "Write a 3-message SMS marketing campaign for [BRAND]'s [PROMOTION/SALE/EVENT]. Message 1 (Announcement): teaser, 3 days before. Message 2 (Urgency): reminder, 1 day before. Message 3 (Last chance): final push, day of. Each message: under 160 characters, clear CTA, opt-out option. Personalize with [FIRST_NAME] token."
      },
      {
        title: "Product Launch Checklist",
        useCase: "Launch Planning",
        level: "beginner",
        prompt: "Create a product launch marketing checklist for [PRODUCT NAME] launching on [DATE]. Categories: Pre-launch (8 weeks out to launch day), Launch day, Post-launch (first 30 days). Include tasks for: content, email, social, PR, ads, community, SEO, and analytics setup. Mark priority tasks with [HIGH]."
      },
      {
        title: "Customer Review Request Email",
        useCase: "Reputation Management",
        level: "beginner",
        prompt: "Write a post-purchase email sequence to generate reviews for [BUSINESS NAME] on [PLATFORM: Google/Trustpilot/G2/Amazon]. Email 1 (Day 7 post-purchase): satisfaction check-in. Email 2 (Day 14): review request with direct link. Email 3 (Day 21): final reminder for non-responders. Keep each email brief, genuine, and personal."
      },
      {
        title: "Event Marketing Copy",
        useCase: "Event Promotion",
        level: "beginner",
        prompt: "Write the marketing copy for [EVENT NAME], a [VIRTUAL/IN-PERSON] [EVENT TYPE: conference/workshop/webinar/networking event] for [AUDIENCE] on [DATE]. Copy needed: (1) Event page headline + subheadline, (2) 'Why attend' bullet points (5), (3) Speaker section intro, (4) Early bird offer CTA, (5) Social media announcement post."
      },
      // INTERMEDIATE (12)
      {
        title: "Full Funnel Marketing Strategy",
        useCase: "Marketing Strategy",
        level: "intermediate",
        prompt: "Build a full-funnel marketing strategy for [PRODUCT/SERVICE] targeting [ICP]. For each funnel stage: TOFU (awareness) — channels, content types, KPIs; MOFU (consideration) — nurture tactics, content, lead scoring; BOFU (decision) — conversion tactics, sales enablement, CRO. Budget split recommendation across stages. Attribution model. 90-day activation plan."
      },
      {
        title: "Go-to-Market (GTM) Strategy",
        useCase: "Product Launch",
        level: "intermediate",
        prompt: "Develop a go-to-market strategy for [PRODUCT] launching in [MARKET]. Cover: (1) Market sizing (TAM/SAM/SOM), (2) ICP definition and segmentation, (3) Value proposition and positioning, (4) Pricing strategy, (5) Distribution channels, (6) Launch phases (pre-launch/launch/post-launch), (7) Marketing mix (product/price/place/promotion), (8) Sales motion, (9) Success metrics for 30/60/90 days."
      },
      {
        title: "Email Marketing Automation Map",
        useCase: "Marketing Automation",
        level: "intermediate",
        prompt: "Map a complete email marketing automation system for [BUSINESS] with [X] product/service types. Include: trigger-based email flows (welcome, post-purchase, win-back, VIP upgrade, cart abandonment, browse abandonment), segmentation logic, timing rules, A/B test plan, and performance benchmarks (open rate, CTR, revenue per email). Draw the automation tree in text format."
      },
      {
        title: "Account-Based Marketing (ABM) Campaign",
        useCase: "B2B Marketing",
        level: "intermediate",
        prompt: "Design an ABM campaign for [COMPANY] targeting [X] enterprise accounts in [INDUSTRY]. Cover: (1) Target account selection criteria and list, (2) Account research framework, (3) Personalized content for each buyer persona (economic buyer, champion, technical evaluator), (4) Outreach sequence (email, LinkedIn, direct mail, executive events), (5) Sales and marketing alignment touchpoints, (6) Success metrics per account, (7) Pipeline velocity targets."
      },
      {
        title: "Content Marketing ROI Calculator",
        useCase: "Marketing Analytics",
        level: "intermediate",
        prompt: "Build a content marketing ROI framework for [COMPANY] to justify [BUDGET] investment. Define: (1) Investment inputs (content creation cost, distribution, tools, team time), (2) Output metrics (traffic, leads, conversions, revenue), (3) Attribution model for content-influenced pipeline, (4) Benchmark data for [INDUSTRY], (5) Excel/spreadsheet model structure, (6) 12-month ROI projection with conservative/base/optimistic scenarios."
      },
      {
        title: "Conversion Rate Optimization (CRO) Plan",
        useCase: "CRO",
        level: "intermediate",
        prompt: "Create a CRO plan for [WEBSITE/PAGE TYPE] with current conversion rate of [X%] and a target of [Y%]. Cover: (1) Heuristic analysis of current page (value prop clarity, friction points, trust signals), (2) Quantitative data review priorities (heatmaps, session recordings, funnel drop-offs), (3) Hypothesis backlog (10 test ideas with expected lift), (4) Testing prioritization (ICE or PIE score), (5) A/B test setup instructions for top 3 hypotheses, (6) Statistical significance requirements."
      },
      {
        title: "Marketing Analytics Dashboard Spec",
        useCase: "Marketing Ops",
        level: "intermediate",
        prompt: "Specify a marketing analytics dashboard for [COMPANY] tracking [MARKETING GOALS]. Include: (1) Executive summary metrics (4 key numbers), (2) Channel performance section (organic, paid, email, social — KPIs for each), (3) Funnel visualization (visits → leads → MQLs → SQLs → customers), (4) Campaign performance tracker, (5) Budget pacing, (6) Data sources to connect (GA4, CRM, ad platforms), (7) Reporting frequency and owner."
      },
      {
        title: "Community Marketing Strategy",
        useCase: "Community Building",
        level: "intermediate",
        prompt: "Design a community marketing strategy for [BRAND] to build an engaged community of [AUDIENCE]. Cover: (1) Community platform choice (Slack/Discord/Circle/Reddit — justify), (2) Community purpose and positioning, (3) Membership tiers and benefits, (4) Content and event calendar (weekly/monthly cadence), (5) Community champions/ambassador program, (6) Onboarding journey for new members, (7) Moderation guidelines, (8) Business metrics (how community drives retention, referral, upsell)."
      },
      {
        title: "Partner/Channel Marketing Program",
        useCase: "Channel Marketing",
        level: "intermediate",
        prompt: "Design a partner/channel marketing program for [COMPANY] to grow revenue through [PARTNER TYPE: resellers/agencies/affiliates/technology partners]. Cover: (1) Partner tiers and qualification criteria, (2) Co-marketing fund allocation, (3) Partner enablement (training, content, tools), (4) Joint go-to-market playbooks, (5) Deal registration and protection, (6) MDF (market development funds) application process, (7) Partner portal requirements, (8) Success metrics and QBR structure."
      },
      {
        title: "Brand Repositioning Strategy",
        useCase: "Brand Strategy",
        level: "intermediate",
        prompt: "Develop a brand repositioning strategy for [COMPANY/BRAND] that needs to shift perception from [CURRENT PERCEPTION] to [DESIRED PERCEPTION]. Cover: (1) Current brand audit, (2) Target audience shift (new vs. existing customers), (3) New positioning statement, (4) Message architecture, (5) Visual identity evolution (if needed), (6) Campaign concept to announce the repositioning, (7) Internal communications plan, (8) Timeline and milestones, (9) Risk management for existing customer base."
      },
      {
        title: "Podcast / Newsletter Sponsorship Pitch",
        useCase: "Sponsorship Marketing",
        level: "intermediate",
        prompt: "Write a sponsorship pitch for [BRAND] to sponsor [PODCAST NAME / NEWSLETTER NAME] with [X] audience of [AUDIENCE DESCRIPTION]. Include: why this audience matches [BRAND]'s ICP, proposed sponsorship packages (3 tiers with pricing), integration format (pre-roll/mid-roll/dedicated issue/banner), exclusivity terms, performance guarantees or metrics, and a case study slot offer for proof of ROI."
      },
      {
        title: "Seasonal Marketing Calendar",
        useCase: "Campaign Planning",
        level: "intermediate",
        prompt: "Build a full-year seasonal marketing calendar for [BRAND] in [INDUSTRY]. For each major calendar moment (holidays, awareness months, industry events, seasonal peaks), specify: campaign angle, promotion type, key channels, content needs, budget tier (high/medium/low), and lead time required. Identify the top 5 highest-revenue opportunities and create a detailed brief for each."
      },
      // ADVANCED (9)
      {
        title: "Marketing Operating System Design",
        useCase: "Marketing Operations",
        level: "advanced",
        prompt: "Design the marketing operating system for a [STAGE: Series A/B/C / enterprise] company with a [X]-person marketing team. Cover: (1) Team structure and role definitions, (2) OKR and goal-setting framework, (3) Campaign planning and prioritization process, (4) Budget allocation framework, (5) MarTech stack architecture (with integration map), (6) Data governance and attribution model, (7) Reporting cadence and stakeholder communication, (8) Experimentation culture and test-learn-scale process."
      },
      {
        title: "1-to-1 Personalization at Scale",
        useCase: "Personalization",
        level: "advanced",
        prompt: "Architect a 1-to-1 personalization system for [COMPANY] across [CHANNELS: website, email, ads, mobile]. Cover: (1) Customer data platform (CDP) requirements and data model, (2) Segmentation and micro-segmentation strategy, (3) Personalization rules engine design, (4) Content variation framework (how many variations, what changes), (5) Real-time vs. batch personalization use cases, (6) Privacy and consent management, (7) Measurement framework for personalization lift, (8) Recommended technology stack."
      },
      {
        title: "Brand Category Creation Strategy",
        useCase: "Market Strategy",
        level: "advanced",
        prompt: "Develop a category creation strategy for [COMPANY] to define and own a new market category called '[CATEGORY NAME]'. Follow the category design playbook: (1) Category problem definition (what existing categories fail at), (2) Category name and definition, (3) Point of view (POV) paper outline, (4) Ecosystem building (partners, analysts, media, customers), (5) Competitive response anticipation, (6) Category queen positioning, (7) 18-month category evangelism campaign, (8) Metrics for category adoption."
      },
      {
        title: "Multi-Market Launch Playbook",
        useCase: "International Marketing",
        level: "advanced",
        prompt: "Create a multi-market launch playbook for [PRODUCT/SERVICE] expanding into [3–5 NEW MARKETS]. For each market: (1) Market entry assessment (size, competition, regulatory), (2) Localization requirements (language, culture, legal), (3) Channel strategy adaptation, (4) Pricing localization, (5) Local partnership needs, (6) Performance benchmarks calibrated to market maturity. Plus: global brand consistency guidelines and central vs. local marketing split decision framework."
      },
      {
        title: "Marketing Technology Audit & Roadmap",
        useCase: "MarTech",
        level: "advanced",
        prompt: "Conduct a marketing technology audit and roadmap for [COMPANY]. Current stack: [LIST TOOLS]. Assessment: (1) Tool utilization scoring (value delivered vs. cost), (2) Integration gaps and data silos, (3) Redundancies to consolidate, (4) Missing capabilities for [BUSINESS GOALS], (5) Build vs. buy analysis for top gaps. Roadmap: (1) Immediate optimizations (0–3 months), (2) Mid-term additions (3–12 months), (3) Long-term vision, (4) Budget impact analysis."
      },
      {
        title: "Demand Generation Engine Design",
        useCase: "B2B Demand Generation",
        level: "advanced",
        prompt: "Design a B2B demand generation engine for [COMPANY] targeting [ICP] with a revenue target of [ARR GOAL]. Architect: (1) Inbound engine (SEO, content, social — volume and quality targets), (2) Outbound engine (ICP data sourcing, sequencing, SDR process), (3) Paid acquisition strategy (channels, budget, CAC targets), (4) Demand capture (branded search, review sites, comparisons), (5) Nurture and pipeline acceleration programs, (6) MQL→SQL→Close conversion rate targets, (7) Revenue attribution model, (8) Scaling triggers and team growth plan."
      },
      {
        title: "Viral Loop Engineering",
        useCase: "Product-Led Growth",
        level: "advanced",
        prompt: "Engineer a viral growth loop for [PRODUCT] to achieve a viral coefficient > 1.0. Analyze: (1) Current activation-to-referral funnel, (2) Viral loop type recommendation (inherent viral / incentivized / communication / collaboration), (3) Friction audit of current sharing flow, (4) Incentive design and gamification, (5) Technical implementation requirements, (6) A/B test plan to optimize loop, (7) Measurement framework (viral coefficient, time-to-virality, referral conversion rate), (8) Case study benchmarks from similar products."
      },
      {
        title: "Customer Lifetime Value Maximization",
        useCase: "Retention Marketing",
        level: "advanced",
        prompt: "Build a CLV maximization strategy for [COMPANY] with current average CLV of [VALUE]. Cover: (1) CLV segmentation model (customer tiers by lifetime value potential), (2) Retention lever identification (biggest drivers of churn at each stage), (3) Expansion revenue playbook (upsell/cross-sell triggers and sequences), (4) Loyalty program design, (5) Proactive churn prediction model brief, (6) Win-back campaign architecture, (7) VIP program for top 10% customers, (8) CLV improvement targets and measurement plan."
      },
      {
        title: "Full Attribution Model Design",
        useCase: "Marketing Analytics",
        level: "advanced",
        prompt: "Design a full marketing attribution model for [COMPANY] with [X] marketing channels and a [SALES CYCLE LENGTH] B2B/B2C sales cycle. Cover: (1) Attribution model selection (first/last/linear/time-decay/data-driven — justify), (2) Data collection requirements across all touchpoints, (3) Offline-to-online connection methodology, (4) Multi-device and cross-platform tracking approach, (5) Incrementality testing framework, (6) Media mix modeling vs. MTA trade-offs, (7) Attribution reporting structure, (8) How to use attribution data for budget allocation decisions."
      }
    ]
  },

  /* ============================================================
     PRODUCTIVITY
     ============================================================ */
  "Productivity": {
    free: [
      {
        title: "Daily Planner Assistant",
        useCase: "Personal Productivity",
        prompt: "Help me plan my day. Here are my tasks for today: [LIST YOUR TASKS]. My working hours are [START TIME] to [END TIME]. I have these fixed commitments: [LIST MEETINGS/APPOINTMENTS]. Create a time-blocked schedule that: batches similar tasks, protects a 90-minute deep work block, includes breaks, and prioritizes using the Eisenhower Matrix. Flag anything that should be delegated or deleted."
      },
      {
        title: "Meeting Agenda Builder",
        useCase: "Team Productivity",
        prompt: "Build a focused meeting agenda for a [X]-minute [MEETING TYPE: e.g., team standup / project kickoff / strategy review] with [NUMBER] attendees. Meeting goal: [DESIRED OUTCOME]. Pre-read material needed: [YES/NO]. Format: clear time blocks per agenda item, owner for each item, discussion vs. decision vs. information labels, and a parking lot section. End with next steps and follow-up owner."
      },
      {
        title: "SOP (Standard Operating Procedure) Writer",
        useCase: "Process Documentation",
        prompt: "Write a Standard Operating Procedure (SOP) for [PROCESS NAME] at [COMPANY/TEAM]. The person performing this is a [ROLE]. Steps involved: [DESCRIBE THE PROCESS]. Include: purpose, scope, when to use, step-by-step instructions (numbered, clear, actionable), decision points with if/then logic, tools required, and a quality check at the end. Format for easy scanning."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "To-Do List Prioritizer",
        useCase: "Task Management",
        level: "beginner",
        prompt: "Here is my to-do list: [PASTE YOUR LIST]. Prioritize it using the MoSCoW method (Must have, Should have, Could have, Won't have). For each item, also estimate the time required (in minutes). Create a 'tackle first' list of the top 5 most impactful items I should focus on today."
      },
      {
        title: "Email Inbox Zero Plan",
        useCase: "Email Management",
        level: "beginner",
        prompt: "I have [X] unread emails. Help me create a system for inbox zero. Design: (1) Email triage categories (Action/Reference/Waiting/Delete), (2) Response time SLAs by sender type, (3) Folder/label structure, (4) Daily email processing routine (time blocks), (5) Templates for the 5 most common email types I send, (6) Rules to automate filtering. My email client: [GMAIL/OUTLOOK]."
      },
      {
        title: "Weekly Review Checklist",
        useCase: "Personal Productivity",
        level: "beginner",
        prompt: "Create a weekly review checklist for a [JOB ROLE/PROFESSION]. The review should take 30–45 minutes. Include: inbox clearance, task list review (done/incomplete/carry-forward), upcoming week preview, goal progress check, lessons learned, and a gratitude/win capture. Format as a fillable template."
      },
      {
        title: "Focus Session Protocol",
        useCase: "Deep Work",
        level: "beginner",
        prompt: "Design a 90-minute deep work focus session protocol for [TYPE OF WORK: e.g., writing / coding / analysis]. Include: pre-session setup ritual (5 minutes), distraction elimination checklist, session structure (Pomodoro or time blocks), mid-session re-focus technique if distracted, post-session review, and energy management tips for the specific work type."
      },
      {
        title: "Delegation Framework",
        useCase: "Leadership",
        level: "beginner",
        prompt: "Help me identify and delegate tasks from my current workload. My role is [ROLE]. My current tasks: [LIST TASKS]. For each task, evaluate: can it be delegated (yes/no), who to delegate to (suggest role type), level of delegation (do and report / do with check-in / self-manage), and what instructions I need to provide. Output a delegation action list."
      },
      {
        title: "Goal Setting Template (OKR)",
        useCase: "Goal Planning",
        level: "beginner",
        prompt: "Help me set quarterly OKRs for [TEAM/INDIVIDUAL ROLE] in [COMPANY TYPE]. My overall goal is [DESCRIBE BROAD GOAL]. Create: 1 primary Objective (inspirational, qualitative, memorable), 3 Key Results per Objective (specific, measurable, time-bound), and 3 initiatives/actions for each Key Result. Format in a clean OKR table."
      },
      {
        title: "Note-Taking Template",
        useCase: "Knowledge Management",
        level: "beginner",
        prompt: "Create a note-taking template for [USE CASE: e.g., meeting notes / book summary / course notes / research notes]. The template should capture: key information fields at the top, main content area with structure, action items section, summary/key takeaways, follow-up questions, and connections to other notes. Optimize for quick capture and easy review later."
      },
      {
        title: "Habit Tracker Design",
        useCase: "Personal Development",
        level: "beginner",
        prompt: "Design a habit tracking system for these habits I want to build: [LIST HABITS]. For each habit: implementation intention ('I will [BEHAVIOR] at [TIME] in [LOCATION]'), minimum viable dose (smallest version that counts), streak tracking format, weekly review trigger, and a reward for hitting a 21-day streak. Include a simple daily tracking template."
      },
      {
        title: "Project Task Breakdown",
        useCase: "Project Management",
        level: "beginner",
        prompt: "Break down this project into actionable tasks: Project: [PROJECT NAME]. Goal: [WHAT SUCCESS LOOKS LIKE]. Deadline: [DATE]. Team size: [X]. Create a Work Breakdown Structure (WBS) with phases, milestones, individual tasks (under 4 hours each), dependencies, and assigned roles. Export as a simple table."
      },
      // INTERMEDIATE (12)
      {
        title: "Team Workflow Design",
        useCase: "Team Operations",
        level: "intermediate",
        prompt: "Design an efficient team workflow for [TEAM TYPE: e.g., marketing team / engineering sprint / content team] of [X] people. Map: (1) Request intake process, (2) Prioritization framework (how work gets selected), (3) Execution workflow with stages and owners, (4) Communication protocols (async vs. sync, tool per use case), (5) Review and approval steps, (6) Done criteria and handoff, (7) Retrospective cadence. Tooling recommendations for each step."
      },
      {
        title: "Remote Team Productivity System",
        useCase: "Remote Work",
        level: "intermediate",
        prompt: "Design a productivity system for a fully remote team of [X] people across [X] time zones. Cover: (1) Async-first communication protocols (what goes in Slack vs. email vs. doc vs. meeting), (2) Meeting cadence and timezone rotation, (3) Documentation standards (what must be written down), (4) Status visibility system (who's working on what), (5) Onboarding process for remote new hires, (6) Tools stack, (7) Culture rituals that build connection without requiring synchronous time."
      },
      {
        title: "Project Risk Register",
        useCase: "Risk Management",
        level: "intermediate",
        prompt: "Create a risk register for [PROJECT NAME]. For each identified risk: risk description, probability (1–5), impact (1–5), risk score (P×I), risk owner, mitigation strategy, contingency plan, and trigger event. Identify at least 10 risks across categories: timeline, resources, technical, dependencies, stakeholder, and external. Sort by risk score descending."
      },
      {
        title: "Quarterly Business Review (QBR) Template",
        useCase: "Business Reviews",
        level: "intermediate",
        prompt: "Build a QBR (Quarterly Business Review) template for [TEAM/DEPARTMENT] presenting to [AUDIENCE: leadership/board/client]. Sections: Quarter in review (OKR scorecard, wins, misses with root cause), Key metrics vs. targets, Insights and learnings, Blockers and dependencies, Next quarter plan (OKRs, priorities, resource needs), Ask from leadership. Design for a 45-minute presentation with data-first storytelling."
      },
      {
        title: "Knowledge Base Architecture",
        useCase: "Knowledge Management",
        level: "intermediate",
        prompt: "Design a knowledge base architecture for [COMPANY/TEAM] with [X] employees. Cover: (1) Taxonomy and category structure, (2) Naming conventions and tagging system, (3) Content ownership and review cadence, (4) Contribution guidelines, (5) Search optimization (how to make content findable), (6) Onboarding integration, (7) Tool recommendation (Notion/Confluence/GitBook — justify), (8) Metrics to measure knowledge base health (coverage, freshness, usage)."
      },
      {
        title: "Automation Opportunity Map",
        useCase: "Process Automation",
        level: "intermediate",
        prompt: "Audit [TEAM/DEPARTMENT] processes and identify automation opportunities. For each identified manual process: current state description, time spent per week, automation approach (Zapier/Make/custom script/AI), estimated time saved, implementation difficulty (easy/medium/hard), and ROI calculation. Prioritize by time saved × frequency × ease. Output the top 10 automation wins."
      },
      {
        title: "Personal Productivity Audit",
        useCase: "Personal Productivity",
        level: "intermediate",
        prompt: "Conduct a personal productivity audit for a [JOB ROLE] who feels overwhelmed and unfocused. Framework: (1) Time audit (how are 168 hours/week actually spent), (2) Energy management (peak hours identification, energy drains), (3) Focus blockers (top distractions and interruptions), (4) Priority misalignment (is time spent on highest-leverage work?), (5) System gaps (what's falling through the cracks), (6) Personalized 30-day improvement plan with daily habits, weekly rituals, and monthly reviews."
      },
      {
        title: "AI Tools Integration Plan for Teams",
        useCase: "AI Productivity",
        level: "intermediate",
        prompt: "Design an AI tools integration plan for a [TEAM TYPE] of [X] people. Cover: (1) Current workflow pain points that AI can address, (2) AI tool recommendations per role and use case (with specific prompts), (3) Adoption rollout phases (pilot → team → organization), (4) Training and enablement plan, (5) Governance guidelines (data privacy, output review requirements), (6) Success metrics (time saved, quality improvement), (7) Change management communication."
      },
      {
        title: "Decision-Making Framework",
        useCase: "Leadership",
        level: "intermediate",
        prompt: "Build a decision-making framework for [DECISION TYPE: e.g., product prioritization / hiring / vendor selection / strategic investments] for [COMPANY/TEAM]. Include: (1) Decision criteria and weighting, (2) Stakeholder input process, (3) Information gathering checklist, (4) Analysis tool (scored matrix), (5) Reversible vs. irreversible decision handling, (6) Decision documentation template, (7) Review and retrospective process, (8) Example decisions walked through the framework."
      },
      {
        title: "Meeting Reduction Audit",
        useCase: "Team Productivity",
        level: "intermediate",
        prompt: "Audit the meeting culture for [TEAM/COMPANY] and design a leaner operating model. Current meeting list: [LIST RECURRING MEETINGS WITH FREQUENCY AND DURATION]. Analysis: (1) Meeting ROI assessment (value vs. time cost), (2) Which meetings to eliminate/consolidate/shorten, (3) Which meetings to convert to async (with format), (4) Meeting hygiene rules (agenda required, on-time start/end, clear owner), (5) New lean meeting calendar, (6) Estimated hours saved per week."
      },
      {
        title: "Cross-Functional Project Charter",
        useCase: "Project Management",
        level: "intermediate",
        prompt: "Write a project charter for [PROJECT NAME], a cross-functional project involving [LIST DEPARTMENTS/TEAMS]. Include: project purpose and business case, SMART objectives, scope (in scope/out of scope), stakeholders and RACI matrix, timeline with milestones, budget overview, risks and dependencies, decision-making authority, communication plan, and success metrics. Keep it to 2 pages."
      },
      {
        title: "Performance Review Framework",
        useCase: "HR / Management",
        level: "intermediate",
        prompt: "Design a performance review framework for [COMPANY SIZE/STAGE] company. Cover: (1) Review cycle (frequency, timing), (2) Self-assessment template, (3) Manager assessment template with behavioral anchors, (4) Peer feedback process, (5) Rating scale with calibration guidelines, (6) Compensation-to-performance link, (7) Development plan structure, (8) Underperformance protocol, (9) High performer recognition process, (10) Bias mitigation checks throughout."
      },
      // ADVANCED (9)
      {
        title: "Organizational Operating System",
        useCase: "Org Design",
        level: "advanced",
        prompt: "Design an organizational operating system for [COMPANY] at [STAGE/SIZE]. Cover: (1) Mission, vision, values as operating principles, (2) OKR architecture (company → team → individual), (3) Meeting rhythm (daily/weekly/monthly/quarterly/annual rituals), (4) Communication protocols across all levels, (5) Decision rights matrix (what decisions live where), (6) Performance and feedback loops, (7) Talent planning cycle, (8) Strategic planning process, (9) How information flows up, down, and across the org."
      },
      {
        title: "Second Brain System Design",
        useCase: "Personal Knowledge Management",
        level: "advanced",
        prompt: "Design a full 'Second Brain' personal knowledge management system for a [ROLE/PROFESSIONAL TYPE]. Based on the PARA method (Projects, Areas, Resources, Archive) and Building a Second Brain methodology. Cover: (1) Capture system (what to capture, tools, capture habit), (2) Organization taxonomy, (3) Distillation process (progressive summarization), (4) Express process (how captured knowledge becomes output), (5) Tool stack and integration, (6) Maintenance and review rituals, (7) Weekly and monthly cleanup process."
      },
      {
        title: "Enterprise Productivity Transformation",
        useCase: "Change Management",
        level: "advanced",
        prompt: "Design a productivity transformation program for a [X]-person [DEPARTMENT/COMPANY] that is experiencing [SPECIFIC PROBLEMS: e.g., missed deadlines, burnout, poor cross-team coordination]. Cover: (1) Diagnostic phase (what to measure and how), (2) Root cause analysis framework, (3) Quick wins (30 days), (4) Medium-term process redesign (60–90 days), (5) Technology and tool changes, (6) Leadership behavior change requirements, (7) Change management and communication plan, (8) Measurement framework for transformation success."
      },
      {
        title: "AI-Augmented Workflow Design",
        useCase: "Future of Work",
        level: "advanced",
        prompt: "Redesign the [WORKFLOW/JOB ROLE] workflow with AI augmentation for maximum output quality and speed. Current workflow: [DESCRIBE]. For each step: (1) Can AI fully automate? (2) Can AI assist the human? (3) Should remain fully human? Map the new human-AI collaborative workflow with: AI tool for each step, prompt templates, human review points, quality gates, and expected time reduction. Include upskilling requirements for the humans in the new workflow."
      },
      {
        title: "Deep Work Culture Design",
        useCase: "Organizational Culture",
        level: "advanced",
        prompt: "Design a deep work culture for [COMPANY/TEAM] that protects focused time while maintaining collaboration. Cover: (1) Deep work policy (protected hours, communication expectations), (2) Physical and digital environment design, (3) Meeting architecture reform, (4) Async communication standards, (5) Interruption prevention system, (6) Deep work scheduling and booking system, (7) Leadership modeling requirements, (8) Measurement (deep work hours per person per week), (9) Onboarding integration so it's the default culture for new hires."
      },
      {
        title: "Executive Time Architecture",
        useCase: "Executive Productivity",
        level: "advanced",
        prompt: "Design an ideal time architecture for a [C-SUITE ROLE: CEO/CTO/CMO/etc.] at a [STAGE] company. Allocate the ideal week: (1) Strategic thinking and decision-making time, (2) Stakeholder management (internal: team, board; external: customers, partners, investors), (3) Recruiting and culture-building, (4) Industry learning and external perspective, (5) Recovery and reflection. For each block: ideal time, day, duration, preparation needed, and how to protect it from being eaten by reactive work."
      },
      {
        title: "Systems Thinking for Operations",
        useCase: "Operations Strategy",
        level: "advanced",
        prompt: "Apply systems thinking to optimize [OPERATIONAL PROBLEM] at [COMPANY]. Map: (1) All actors and their incentives in the current system, (2) Feedback loops (reinforcing loops that accelerate problems, balancing loops), (3) Delays in the system (where slow feedback causes over-correction), (4) Leverage points (where small changes create large systemic shifts), (5) Proposed interventions at 3 different levels of the system, (6) Unintended consequences to monitor, (7) Measurement approach to track system health."
      },
      {
        title: "Flow State Engineering",
        useCase: "Human Performance",
        level: "advanced",
        prompt: "Design a flow state engineering system for [CREATIVE/KNOWLEDGE WORKER TYPE]. Based on Mihaly Csikszentmihalyi's flow theory and modern neuroscience. Cover: (1) Flow state triggers audit (environment, challenge-skill balance, clear goals), (2) Pre-flow routine design, (3) Task selection and batching for flow compatibility, (4) Distraction elimination system (digital, social, internal), (5) Flow session structure with recovery, (6) Post-flow reflection and capture process, (7) Metrics to track flow frequency and depth over time."
      },
      {
        title: "Productivity System for Scale",
        useCase: "Scaling Operations",
        level: "advanced",
        prompt: "Design a productivity system that scales with company growth from [CURRENT STAGE: e.g., 10-person startup] to [TARGET STAGE: e.g., 200-person company]. Build in: (1) Process documentation standards that don't create bureaucracy, (2) Decision-making frameworks that preserve speed as hierarchy grows, (3) Communication systems that stay efficient as headcount multiplies, (4) Knowledge transfer systems that survive employee turnover, (5) Culture preservation mechanisms, (6) Scaling triggers (what changes at each headcount milestone: 25, 50, 100, 200)."
      }
    ]
  },

  /* ============================================================
     RESEARCH
     ============================================================ */
  "Research": {
    free: [
      {
        title: "Literature Review Framework",
        useCase: "Academic Research",
        prompt: "Help me conduct a literature review on [RESEARCH TOPIC] in [FIELD]. Structure: (1) Search strategy (databases, keywords, inclusion/exclusion criteria), (2) Key themes emerging from the literature, (3) Gaps and contradictions identified, (4) Methodological approaches used across studies, (5) Theoretical frameworks most cited, (6) A synthesis of findings. Sources to include: [PASTE KEY PAPERS OR DESCRIBE SCOPE]. Format as an outline for a 2,000-word literature review."
      },
      {
        title: "Market Research Summary",
        useCase: "Business Research",
        prompt: "Conduct a market research summary for [MARKET/INDUSTRY] in [GEOGRAPHY]. Cover: (1) Market size and growth rate (TAM/CAGR), (2) Key market segments, (3) Major players and market share, (4) Key trends driving growth, (5) Challenges and threats, (6) Customer behavior insights, (7) Regulatory environment, (8) Investment activity. Cite data sources where possible. Purpose: [WHY YOU NEED THIS RESEARCH]."
      },
      {
        title: "Competitive Intelligence Report",
        useCase: "Competitive Research",
        prompt: "Build a competitive intelligence report on [COMPETITOR NAME] for [MY COMPANY] in the [INDUSTRY] space. Research: (1) Company overview (size, funding, leadership), (2) Product/service analysis, (3) Pricing strategy, (4) Marketing and positioning, (5) Recent news and strategic moves, (6) Customer reviews and sentiment, (7) Hiring signals, (8) Strengths and weaknesses vs. [MY COMPANY]. Sources to check: [LIST]."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Research Question Formulator",
        useCase: "Research Planning",
        level: "beginner",
        prompt: "Help me formulate a clear research question for my study on [TOPIC]. Starting broad idea: [YOUR INITIAL IDEA]. Refine it into: (1) A clear, focused research question, (2) 2 sub-questions, (3) Statement of significance (why this matters), (4) Null and alternative hypothesis (if applicable), (5) Key variables to measure, (6) Scope limitations."
      },
      {
        title: "Survey Design Template",
        useCase: "Primary Research",
        level: "beginner",
        prompt: "Design a [X]-question survey to research [RESEARCH GOAL] for [TARGET RESPONDENTS]. Include: screening question (1–2), demographic questions (3–4), core research questions (mix of Likert scale, multiple choice, and open-ended), a Net Promoter Score question if applicable, and a closing question. Avoid leading questions, double-barreled questions, and loaded language. Estimated completion time: [X minutes]."
      },
      {
        title: "Data Source Finder",
        useCase: "Secondary Research",
        level: "beginner",
        prompt: "Identify the best data sources for researching [TOPIC] in [FIELD/GEOGRAPHY]. For each source: name, URL/access method, type of data available, update frequency, cost (free/paid), reliability rating, and how to best use it for [MY RESEARCH PURPOSE]. Provide 10 sources across: government/official, academic, industry, news, and social/behavioral."
      },
      {
        title: "Research Summary Generator",
        useCase: "Research Synthesis",
        level: "beginner",
        prompt: "Summarize the following research paper/report in plain English: [PASTE ABSTRACT OR KEY SECTIONS]. Provide: (1) One-sentence bottom line, (2) Key findings (3–5 bullets), (3) Methodology in 2 sentences, (4) Limitations acknowledged by the authors, (5) Implications for [MY USE CASE], (6) Questions this research leaves unanswered."
      },
      {
        title: "Interview Guide Designer",
        useCase: "Qualitative Research",
        level: "beginner",
        prompt: "Design a qualitative research interview guide for [RESEARCH TOPIC] targeting [INTERVIEW SUBJECTS]. Include: interview objectives, screener criteria, warm-up questions (2–3), main topic questions (8–10 open-ended), probing follow-up prompts for each main question, a 'devil's advocate' question to surface hidden opinions, and a closing question. Estimated interview length: [X] minutes."
      },
      {
        title: "Fact-Checking Checklist",
        useCase: "Research Integrity",
        level: "beginner",
        prompt: "Create a fact-checking checklist for [TYPE OF CONTENT: e.g., blog post / report / marketing claim]. Include checks for: source credibility (primary vs. secondary), data currency (how recent), statistical accuracy (sample size, margin of error), logical consistency, quote accuracy, confirmation bias signals, and missing context. Provide a rating system to classify each claim as Verified / Needs Caution / Unverified."
      },
      {
        title: "Secondary Research Plan",
        useCase: "Desk Research",
        level: "beginner",
        prompt: "Build a secondary research plan to answer this business question: [RESEARCH QUESTION]. Define: (1) Information needed to answer the question, (2) Best sources for each information type, (3) Search strategy (keywords, boolean operators), (4) Evaluation criteria for sources, (5) Data extraction template, (6) Timeline and deliverable format. Research to complete in [X HOURS/DAYS]."
      },
      {
        title: "Research Abstract Writer",
        useCase: "Academic Writing",
        level: "beginner",
        prompt: "Write an academic abstract for a paper titled '[PAPER TITLE]' about [TOPIC]. The paper's key points: [DESCRIBE MAIN FINDINGS AND METHODOLOGY]. Abstract structure: background/context (1–2 sentences), research gap or objective, methodology (1–2 sentences), key findings (2–3 sentences), conclusions/implications. Target: 150–250 words. Field: [ACADEMIC FIELD]."
      },
      {
        title: "Trend Analysis Brief",
        useCase: "Trend Research",
        level: "beginner",
        prompt: "Analyze [TREND NAME] in [INDUSTRY/MARKET]. Provide: (1) Clear definition of the trend, (2) Evidence it's real (data points, examples), (3) Driving forces (technological, social, economic, regulatory), (4) Current stage on the adoption curve (emerging/growing/mainstream/declining), (5) Implications for [MY BUSINESS/FIELD], (6) Leading companies or examples, (7) 3-year outlook."
      },
      // INTERMEDIATE (12)
      {
        title: "User Research Plan (UX)",
        useCase: "UX Research",
        level: "intermediate",
        prompt: "Design a comprehensive user research plan for [PRODUCT/FEATURE]. Cover: (1) Research objectives and questions, (2) Methods mix (generative vs. evaluative, qualitative vs. quantitative), (3) Participant recruitment criteria and sample size, (4) Research instruments (interview guide, usability tasks, survey), (5) Session moderation plan, (6) Data analysis approach, (7) Deliverable format (research report, journey map, insight cards), (8) Timeline and budget. Include a stakeholder alignment checklist."
      },
      {
        title: "Industry Analysis (Porter's Five Forces)",
        useCase: "Strategic Research",
        level: "intermediate",
        prompt: "Conduct a Porter's Five Forces analysis for the [INDUSTRY] industry. For each force: (1) Threat of New Entrants, (2) Bargaining Power of Suppliers, (3) Bargaining Power of Buyers, (4) Threat of Substitutes, (5) Competitive Rivalry — assess as Low/Medium/High, provide 3–5 specific factors driving that assessment, and rate the overall attractiveness of the industry. Conclude with strategic implications for [MY COMPANY]."
      },
      {
        title: "Quantitative Data Analysis Plan",
        useCase: "Data Analysis",
        level: "intermediate",
        prompt: "Design a quantitative data analysis plan for this dataset: [DESCRIBE DATA: columns, size, source]. Research question: [YOUR QUESTION]. Plan: (1) Data cleaning steps needed, (2) Descriptive statistics to generate, (3) Statistical tests to run (with justification for each test choice), (4) Visualization types per insight, (5) Expected output format, (6) Interpretation guidelines for results, (7) Limitations to acknowledge. Tools: [PYTHON/R/EXCEL/TABLEAU]."
      },
      {
        title: "Consumer Behavior Research",
        useCase: "Marketing Research",
        level: "intermediate",
        prompt: "Design a consumer behavior research study for [BRAND/PRODUCT] to understand [RESEARCH QUESTION]. Methods: (1) Ethnographic observation plan (where, what to observe, how to document), (2) Focus group discussion guide (2 groups, 90 minutes each), (3) Behavioral data analysis plan (what digital behavioral data to analyze), (4) Survey component (10 key questions). Synthesis approach: how to triangulate findings across methods. Insight output format."
      },
      {
        title: "Patent and IP Research Process",
        useCase: "IP Research",
        level: "intermediate",
        prompt: "Design a patent and intellectual property research process for [COMPANY] developing [TECHNOLOGY/PRODUCT]. Cover: (1) Prior art search methodology (databases: Google Patents, USPTO, EPO, WIPO), (2) Patent classification system navigation guide, (3) Freedom-to-operate analysis approach, (4) Competitive patent landscape mapping, (5) White space identification method, (6) Patent filing readiness checklist, (7) IP risk assessment framework."
      },
      {
        title: "Systematic Review Protocol",
        useCase: "Academic Research",
        level: "intermediate",
        prompt: "Write a systematic review protocol for the research question: '[RESEARCH QUESTION]'. Include: PICO/PICOT framework application, inclusion/exclusion criteria, database search strategy (3–5 databases with search strings), screening process (titles → abstracts → full text), data extraction template, quality assessment tool selection, synthesis method (meta-analysis/narrative synthesis), bias assessment approach, and PRISMA flow diagram structure."
      },
      {
        title: "Economic Impact Analysis",
        useCase: "Policy / Business Research",
        level: "intermediate",
        prompt: "Design an economic impact analysis for [INITIATIVE/PROJECT/POLICY] in [GEOGRAPHY/SECTOR]. Cover: (1) Direct impacts (jobs, revenue, investment), (2) Indirect impacts (supply chain effects), (3) Induced impacts (spending effects), (4) Methodology (input-output analysis, multiplier selection), (5) Counterfactual/baseline scenario, (6) Attribution methodology, (7) Data requirements, (8) Limitations and caveats, (9) Presentation format for different stakeholders."
      },
      {
        title: "Social Media Listening Research Plan",
        useCase: "Social Research",
        level: "intermediate",
        prompt: "Design a social media listening research program for [BRAND/TOPIC]. Cover: (1) Research objectives and questions, (2) Platform scope (which platforms and why), (3) Keyword and hashtag strategy (branded, competitor, category, sentiment), (4) Boolean search string construction, (5) Filtering criteria (language, geography, account type), (6) Volume benchmarking, (7) Sentiment and theme analysis framework, (8) Reporting cadence and stakeholder format, (9) Tool recommendation."
      },
      {
        title: "Regulatory Research Brief",
        useCase: "Compliance Research",
        level: "intermediate",
        prompt: "Conduct a regulatory research brief for [COMPANY/PRODUCT] operating in [INDUSTRY] in [MARKETS]. Map: (1) Applicable regulations by jurisdiction, (2) Key regulatory bodies and their authority, (3) Compliance requirements summary (licenses, filings, standards, data protection), (4) Pending regulation changes, (5) Compliance risk rating per requirement, (6) Expert/legal counsel areas to engage, (7) Compliance calendar with key deadlines."
      },
      {
        title: "Investment Research Memo",
        useCase: "Investment Research",
        level: "intermediate",
        prompt: "Write an investment research memo on [COMPANY/ASSET/MARKET] for [INVESTMENT THESIS]. Sections: (1) Executive Summary, (2) Business Overview (model, market, moat), (3) Financial Analysis (key metrics, growth trajectory, unit economics), (4) Competitive Positioning, (5) Risks (3–5 key risks with probability/impact), (6) Bull/Base/Bear case scenarios, (7) Valuation framework, (8) Recommendation. Data sources: [LIST AVAILABLE DATA]."
      },
      {
        title: "A/B Test Research Design",
        useCase: "Experimentation",
        level: "intermediate",
        prompt: "Design a rigorous A/B test for [HYPOTHESIS: e.g., changing the CTA button color from blue to orange will increase conversions]. Cover: (1) Hypothesis statement (clear, falsifiable), (2) Primary metric and secondary metrics, (3) Statistical power calculation (sample size needed), (4) Test duration, (5) Audience segmentation and traffic split, (6) Control and treatment descriptions, (7) Exclusion criteria, (8) Analysis plan (statistical test, confidence threshold), (9) Decision criteria (what constitutes a win/loss/inconclusive), (10) Post-test action plan."
      },
      {
        title: "Environmental Scan (PESTLE)",
        useCase: "Strategic Research",
        level: "intermediate",
        prompt: "Conduct a PESTLE analysis for [ORGANIZATION] in [INDUSTRY/MARKET]. For each factor — Political, Economic, Social, Technological, Legal, Environmental — identify: (1) 3–5 key factors, (2) Current impact (positive/negative/neutral), (3) Future trend direction (improving/worsening/stable), (4) Probability and impact score, (5) Strategic implications. Conclude with the top 5 highest-priority macro factors to monitor and respond to."
      },
      // ADVANCED (9)
      {
        title: "Mixed-Methods Research Design",
        useCase: "Academic Research",
        level: "advanced",
        prompt: "Design a rigorous mixed-methods research study on [RESEARCH TOPIC]. Specify: (1) Research paradigm and philosophical foundation (pragmatism/constructivism), (2) Rationale for mixing methods (triangulation/complementarity/sequential explanation), (3) Quantitative strand (design, sampling, instruments, analysis), (4) Qualitative strand (design, sampling strategy, data collection, analysis approach), (5) Integration strategy (where and how strands connect), (6) Quality criteria for each strand, (7) Researcher positionality statement, (8) Ethical considerations."
      },
      {
        title: "Primary Research Study Design",
        useCase: "Research Methodology",
        level: "advanced",
        prompt: "Design a primary research study to answer: '[RESEARCH QUESTION]'. Provide: (1) Study design selection with justification (RCT/cohort/case-control/cross-sectional/quasi-experimental), (2) Population and sampling methodology (probability/non-probability), (3) Sample size calculation with power analysis, (4) Measurement instruments with validity and reliability considerations, (5) Data collection protocol, (6) Blinding procedures (if applicable), (7) Statistical analysis plan, (8) Bias identification and mitigation, (9) Ethical approval requirements, (10) Dissemination plan."
      },
      {
        title: "Research Impact Framework",
        useCase: "Research Evaluation",
        level: "advanced",
        prompt: "Design a research impact framework for [RESEARCH PROGRAM/INSTITUTION]. Cover: (1) Theory of change (how research creates societal value), (2) Impact pathway mapping (from research outputs → outcomes → impacts), (3) Indicator selection at each level (academic, economic, social, policy impact), (4) Data collection methodology per indicator, (5) Counterfactual approach, (6) Attribution vs. contribution analysis, (7) Reporting structure for different audiences (funders, policymakers, public), (8) Limitations and uncertainty communication."
      },
      {
        title: "Grounded Theory Study Plan",
        useCase: "Qualitative Research",
        level: "advanced",
        prompt: "Design a grounded theory research study on [TOPIC]. Cover: (1) Theoretical sampling strategy (initial sample, theoretical saturation approach), (2) Data collection methods (interviews, observation, documents), (3) Concurrent data collection and analysis process, (4) Coding process (open → axial → selective coding), (5) Memo writing protocol, (6) Constant comparative method application, (7) Negative case analysis, (8) Core category emergence criteria, (9) Theory building and verification, (10) Quality criteria (credibility, transferability, dependability, confirmability)."
      },
      {
        title: "Big Data Research Architecture",
        useCase: "Data Science Research",
        level: "advanced",
        prompt: "Architect a big data research project on [TOPIC] using [DATA SOURCE: e.g., social media data / transaction records / sensor data]. Cover: (1) Data acquisition strategy (APIs, web scraping, data partnerships), (2) Storage architecture for [DATA VOLUME], (3) ETL/ELT pipeline design, (4) Feature engineering approach, (5) Analysis methodology (ML approach: supervised/unsupervised/NLP/time-series), (6) Model validation strategy, (7) Interpretation and bias audit, (8) Privacy and ethical compliance, (9) Research infrastructure requirements, (10) Publication and reproducibility plan."
      },
      {
        title: "Technology Foresight Study",
        useCase: "Technology Research",
        level: "advanced",
        prompt: "Design a technology foresight study for [TECHNOLOGY AREA] over a [5/10]-year horizon. Methods: (1) Technology readiness level (TRL) assessment of current state, (2) Expert elicitation design (Delphi method rounds), (3) Patent and publication analysis approach, (4) Scenario construction methodology (2×2 matrix design), (5) Roadmapping approach (technology → market → industry evolution), (6) Wild card and weak signal identification method, (7) Implications analysis for [STAKEHOLDER TYPE], (8) Stakeholder engagement and validation plan, (9) Output format and dissemination strategy."
      },
      {
        title: "Ethnographic Research Study",
        useCase: "Anthropological Research",
        level: "advanced",
        prompt: "Design a digital or physical ethnographic research study on [COMMUNITY/CULTURE/PHENOMENON]. Cover: (1) Research site selection and access negotiation, (2) Researcher role (observer/participant-observer/participant) with reflexivity considerations, (3) Fieldwork protocol and data collection methods (observation, interviews, artifact collection, field notes), (4) Thick description standards, (5) Emic vs. etic perspective management, (6) Key informant selection strategy, (7) Data management and analysis (thematic/narrative/discourse analysis), (8) Ethical considerations (consent, vulnerability, representation), (9) Exit strategy and member checking."
      },
      {
        title: "Clinical/Social Research Protocol",
        useCase: "Applied Research",
        level: "advanced",
        prompt: "Design a [CLINICAL TRIAL / SOCIAL PROGRAM] research protocol for [INTERVENTION] targeting [POPULATION]. Following [CONSORT/TREND/SQUIRE] reporting standards. Include: (1) Background and rationale, (2) PICO framework, (3) Study design and randomization (if applicable), (4) Intervention protocol description, (5) Outcome measures (primary + secondary), (6) Sample size and power calculation, (7) Data collection plan and instruments, (8) Statistical analysis plan, (9) Safety monitoring plan, (10) IRB/ethics board submission checklist, (11) Participant recruitment and consent process."
      },
      {
        title: "Research Commercialization Strategy",
        useCase: "Technology Transfer",
        level: "advanced",
        prompt: "Develop a commercialization strategy for [RESEARCH/TECHNOLOGY] developed at [INSTITUTION/LAB]. Cover: (1) Technology readiness level assessment, (2) IP landscape and freedom-to-operate analysis, (3) Market opportunity sizing, (4) Commercialization pathway options (license/spin-out/partnership — pros/cons), (5) Ideal licensee/partner profile, (6) Valuation approach, (7) Go-to-market strategy for the chosen pathway, (8) Funding requirements and sources, (9) Key milestones, (10) Risk matrix with mitigation strategies."
      }
    ]
  },

  /* ============================================================
     SALES
     ============================================================ */
  "Sales": {
    free: [
      {
        title: "Cold Email Sequence",
        useCase: "Outbound Sales",
        prompt: "Write a 4-email cold outreach sequence for [MY PRODUCT/SERVICE] targeting [PROSPECT JOB TITLE] at [COMPANY TYPE]. Email 1: Pattern interrupt + value hook (Day 1). Email 2: Case study/social proof angle (Day 4). Email 3: Different angle / pain-point focused (Day 8). Email 4: Breakup email (Day 14). Each email: subject line, preview text, under 100-word body, and one soft CTA. Avoid: being salesy, generic claims, feature dumping."
      },
      {
        title: "Sales Call Script",
        useCase: "Discovery Calls",
        prompt: "Write a discovery call script for selling [PRODUCT/SERVICE] to [BUYER PERSONA]. Structure: opening (build rapport, set agenda), discovery questions (5 questions to uncover pain, impact, timeline, budget, authority), transitioning to the pitch, presentation of 3 key value props with proof, handling the top 3 objections, and closing with a clear next step. Duration target: 30 minutes."
      },
      {
        title: "Sales Proposal Template",
        useCase: "Proposal Writing",
        prompt: "Write a sales proposal template for [PRODUCT/SERVICE] targeting [CLIENT TYPE]. Sections: Executive Summary (their problem + your solution in 150 words), Understanding of Their Needs (echo their stated challenges), Proposed Solution (what you'll deliver), Methodology/Approach (how you'll do it), Investment (pricing section with options), Timeline, Team (why us), Social Proof, Terms, and Next Steps. Professional, client-focused tone."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "LinkedIn Prospecting Message",
        useCase: "Social Selling",
        level: "beginner",
        prompt: "Write a LinkedIn connection request message and follow-up message for [MY ROLE] reaching out to [TARGET PROSPECT ROLE] at [COMPANY TYPE]. Connection request: personalized, 300 characters, no pitch. Follow-up message (after connecting): 100 words, reference something specific about them, open with curiosity, soft CTA. Avoid: generic compliments, immediate pitching, asking for a meeting too soon."
      },
      {
        title: "Objection Response Scripts",
        useCase: "Objection Handling",
        level: "beginner",
        prompt: "Write objection handling scripts for the 5 most common sales objections for [PRODUCT/SERVICE]: (1) 'It's too expensive', (2) 'We already have a solution', (3) 'Now isn't the right time', (4) 'I need to think about it', (5) 'Send me some information'. For each: an empathy acknowledgment, a reframe, a proof point, and a soft close question."
      },
      {
        title: "Follow-Up Email After Meeting",
        useCase: "Sales Follow-Up",
        level: "beginner",
        prompt: "Write a follow-up email to send within 2 hours after a sales meeting with [PROSPECT NAME] at [COMPANY]. The meeting covered: [KEY TOPICS DISCUSSED]. Their top pain point: [PAIN POINT]. Agreed next step: [NEXT STEP]. Include: personalized opening, brief recap of key insights, value reminder tied to their pain point, clear next step with date, and a resource or case study relevant to their situation."
      },
      {
        title: "Sales Email Subject Lines",
        useCase: "Email Marketing",
        level: "beginner",
        prompt: "Write 20 high-converting sales email subject lines for [PRODUCT/SERVICE] targeting [AUDIENCE]. Mix these formulas: curiosity-gap, personalization token, pain-point reference, social proof, urgency/scarcity, question, number-based, direct benefit. Mark the top 5 with ⭐. Note: avoid clickbait, spam trigger words, and all caps."
      },
      {
        title: "Sales One-Pager Copy",
        useCase: "Sales Enablement",
        level: "beginner",
        prompt: "Write copy for a sales one-pager for [PRODUCT/SERVICE]. Include: headline (the core benefit promise), subheadline (who it's for), problem statement, solution description, 3 key features with benefits (feature → benefit → proof), customer quote/testimonial, key stats/results, logo strip (placeholder), and a CTA. Keep total copy under 300 words. Designed to be handed to a decision-maker."
      },
      {
        title: "Price Increase Announcement",
        useCase: "Customer Retention",
        level: "beginner",
        prompt: "Write a price increase announcement email for [PRODUCT/SERVICE] with a [X%] price increase effective [DATE]. Tone: transparent, value-focused, and empathetic. Include: sincere acknowledgment, reason for the increase (brief and honest), value delivered to date, new pricing, any grace period/grandfather option, and a CTA to lock in the current price or upgrade. Goal: minimize churn."
      },
      {
        title: "Upsell / Cross-Sell Script",
        useCase: "Revenue Expansion",
        level: "beginner",
        prompt: "Write an upsell/cross-sell script for a customer success call introducing [UPSELL PRODUCT/TIER] to an existing customer currently on [CURRENT PLAN]. The customer's use case is [USE CASE]. Approach: (1) Start with their success, (2) Identify a limitation they're hitting, (3) Introduce the upgrade naturally as a solution, (4) Show the ROI of upgrading, (5) Handle the price objection, (6) Close with a clear offer."
      },
      {
        title: "Sales Battlecard",
        useCase: "Competitive Sales",
        level: "beginner",
        prompt: "Create a sales battlecard for [MY PRODUCT] vs. [COMPETITOR]. Include: (1) When you see this competitor (signals), (2) Why prospects consider them, (3) Our key differentiators (3–5 points with proof), (4) Where we lose to them honestly, (5) Trap questions to expose their weaknesses, (6) Proof points/case studies that beat their strengths, (7) Landmine questions to plant doubt, (8) Winning close lines."
      },
      {
        title: "Trial-to-Paid Conversion Sequence",
        useCase: "SaaS Sales",
        level: "beginner",
        prompt: "Write a 5-email in-app/email sequence to convert trial users to paid for [SAAS PRODUCT]. Email timing: Day 1 (welcome + quick win), Day 3 (feature education on key value driver), Day 7 (social proof + case study), Day 12 (objection preemption + FAQ), Day 14 (urgency + trial end reminder + offer). Each email: clear subject, 150 words max, one CTA."
      },
      // INTERMEDIATE (12)
      {
        title: "Full SDR Outbound Playbook",
        useCase: "Sales Development",
        level: "intermediate",
        prompt: "Write a complete SDR outbound playbook for [COMPANY] selling [PRODUCT] to [ICP]. Cover: (1) ICP and buyer persona profiles, (2) Prospecting and lead sourcing process, (3) Personalization framework (1:1/1:few/1:many tiers), (4) Multi-touch sequence (email + LinkedIn + call — 10 touches over 21 days), (5) Call script (cold call opening, qualifying questions, pitch, objections, close), (6) Email templates for each touch, (7) Voicemail script, (8) Qualification criteria (BANT/MEDDIC), (9) CRM hygiene standards, (10) KPIs and daily activity targets."
      },
      {
        title: "Enterprise Sales Strategy",
        useCase: "Enterprise Sales",
        level: "intermediate",
        prompt: "Develop an enterprise sales strategy for [COMPANY] targeting [ENTERPRISE SEGMENT] accounts with [ACV TARGET]. Cover: (1) Ideal enterprise account profile, (2) Multi-threaded buying committee map (economic buyer, champion, technical evaluator, legal, procurement), (3) Account-based outreach strategy, (4) Discovery methodology (MEDDPICC), (5) Proof of concept/pilot structure, (6) Procurement and legal navigation, (7) Negotiation approach, (8) Success metrics and milestones, (9) Sales cycle management (6–18 months), (10) Account expansion playbook post-close."
      },
      {
        title: "Sales Forecast Model",
        useCase: "Sales Operations",
        level: "intermediate",
        prompt: "Design a sales forecasting model for [COMPANY] with [X] salespeople and a [LENGTH] sales cycle. Include: (1) Pipeline stage definitions with probability percentages, (2) Weighted pipeline calculation methodology, (3) Commit/best case/most likely categorization, (4) Historical conversion rate analysis, (5) Seasonality adjustments, (6) Activity-based leading indicator tracking, (7) Weekly forecast meeting agenda, (8) CRM field requirements, (9) Forecast accuracy measurement, (10) Board-level forecast report template."
      },
      {
        title: "Sales Territory Planning",
        useCase: "Sales Management",
        level: "intermediate",
        prompt: "Design a sales territory plan for a team of [X] account executives covering [MARKET]. Cover: (1) Segmentation criteria (geography/vertical/company size/named accounts), (2) Territory allocation methodology (by revenue potential, not just count), (3) Carve-out rules for strategic accounts, (4) Quota assignment per territory, (5) Resource alignment (SDR, SE, CSM support per territory), (6) Coverage model, (7) Re-balancing triggers and process, (8) Territory performance metrics and review cadence."
      },
      {
        title: "Customer Success to Expansion Playbook",
        useCase: "Revenue Expansion",
        level: "intermediate",
        prompt: "Write a customer success to expansion playbook for [SAAS/SERVICE COMPANY]. Cover: (1) Health score framework (leading indicators of expansion-readiness vs. churn risk), (2) Expansion trigger identification, (3) QBR (quarterly business review) structure designed to surface expansion opportunities, (4) Upsell/cross-sell conversation frameworks, (5) Multi-stakeholder engagement strategy, (6) Renewal negotiation playbook, (7) At-risk account intervention protocol, (8) CSM-to-Sales handoff for large expansion deals, (9) Expansion metrics (NRR, GRR, expansion ARR)."
      },
      {
        title: "Revenue Operations Framework",
        useCase: "RevOps",
        level: "intermediate",
        prompt: "Build a Revenue Operations framework for [COMPANY] to align Sales, Marketing, and Customer Success. Cover: (1) RevOps team structure and responsibilities, (2) Tech stack audit and integration map (CRM, MAP, CS platform), (3) Data governance and single source of truth definition, (4) Lead-to-cash process mapping (all handoffs and SLAs), (5) Shared metrics and dashboard, (6) Attribution model, (7) Compensation plan alignment, (8) Quarterly revenue planning process."
      },
      {
        title: "Win/Loss Analysis Program",
        useCase: "Sales Intelligence",
        level: "intermediate",
        prompt: "Design a win/loss analysis program for [COMPANY]. Cover: (1) Data collection methodology (post-deal interviews: won, lost, no-decision), (2) Interview guide for prospects (10 questions), (3) Interview guide for reps (self-debrief), (4) CRM tagging taxonomy for reasons won/lost, (5) Quantitative analysis framework, (6) Qualitative theme coding system, (7) Reporting cadence and format, (8) Insight distribution to Sales, Product, and Marketing, (9) Action-tracking process to close identified gaps."
      },
      {
        title: "Partner/Channel Sales Program",
        useCase: "Channel Sales",
        level: "intermediate",
        prompt: "Design a partner/channel sales program for [COMPANY] to generate [X%] of revenue through partners within [TIMEFRAME]. Cover: (1) Partner types and ideal partner profile, (2) Recruitment and qualification process, (3) Partner onboarding and enablement (training, certifications, tools), (4) Go-to-market co-sell framework, (5) Deal registration and protection rules, (6) Compensation and incentive structure, (7) Partner portal requirements, (8) QBR with top partners, (9) Partner tier advancement criteria."
      },
      {
        title: "Sales Manager Coaching Playbook",
        useCase: "Sales Leadership",
        level: "intermediate",
        prompt: "Write a sales manager coaching playbook for [COMPANY]. Cover: (1) 1:1 meeting structure (weekly cadence, pipeline review, coaching vs. inspection balance), (2) Call coaching framework (listen, observe, debrief), (3) Rep skill assessment matrix by competency, (4) Coaching plan template for under-performers, (5) Recognition and motivation system for top performers, (6) Ramping plan for new hires (30/60/90 day milestones), (7) Team meeting agenda (weekly and monthly), (8) Escalation protocol for at-risk deals."
      },
      {
        title: "Sales Compensation Plan Design",
        useCase: "Sales Operations",
        level: "intermediate",
        prompt: "Design a sales compensation plan for [SALES ROLE: AE/SDR/CSM] at [COMPANY] with a [OTE] target. Cover: (1) Base vs. variable split (justify), (2) Quota setting methodology, (3) Accelerator structure above quota, (4) Clawback provisions, (5) Decelerator below threshold, (6) Bonus components (strategic objectives, retention, product mix), (7) Payment timing and mechanics, (8) How the plan aligns with company revenue goals, (9) Model scenarios (at 50%, 75%, 100%, 125%, 150% of quota), (10) Plan change communication approach."
      },
      {
        title: "Sales Pitch Deck",
        useCase: "Sales Presentations",
        level: "intermediate",
        prompt: "Write the narrative copy for a sales pitch deck for [PRODUCT/SERVICE] targeting [BUYER PERSONA]. Slides: (1) Opening hook slide, (2) Problem/status quo, (3) Cost of the problem (quantify), (4) Solution overview, (5) How it works (3 steps), (6) Results/case study, (7) ROI calculator slide, (8) Differentiation vs. alternatives, (9) Pricing and packages, (10) Why now, (11) Next steps. Each slide: headline (under 10 words), 3 supporting bullets, speaker notes."
      },
      {
        title: "Account Expansion Mapping",
        useCase: "Account Management",
        level: "intermediate",
        prompt: "Create an account expansion map for [KEY ACCOUNT NAME], an existing customer using [CURRENT PRODUCT/SERVICE]. Map: (1) Current state (products used, users, spend, departments engaged), (2) Whitespace analysis (untapped departments, use cases, products), (3) Stakeholder map (current champions + potential new contacts), (4) Expansion hypothesis (which opportunity first and why), (5) ROI case for expansion, (6) 90-day expansion outreach plan, (7) Success criteria."
      },
      // ADVANCED (9)
      {
        title: "Sales Transformation Roadmap",
        useCase: "Sales Leadership",
        level: "advanced",
        prompt: "Design an 18-month sales transformation roadmap for [COMPANY] moving from [CURRENT STATE: e.g., founder-led / transactional / reactive] to [TARGET STATE: e.g., scalable / consultative / proactive]. Cover: (1) Current state diagnosis (sales process, team skills, tech, metrics), (2) Transformation vision and success definition, (3) Phase 1 (0–6 months): foundations, (4) Phase 2 (6–12 months): optimization, (5) Phase 3 (12–18 months): scale, (6) Change management, (7) Capability building plan, (8) Technology roadmap, (9) Financial model for the transformation investment."
      },
      {
        title: "Complex Deal Strategy",
        useCase: "Enterprise Deals",
        level: "advanced",
        prompt: "Build a deal strategy for [SPECIFIC DEAL: company, size, stage]. Analyze: (1) Buying committee map (all stakeholders, their priorities, political relationships), (2) Power map (who has influence, who blocks), (3) Deal health scorecard (strengths, vulnerabilities, unknowns), (4) Competitive threat assessment, (5) Negotiation strategy (opening position, concession plan, walk-away criteria), (6) Champion activation and enablement plan, (7) Executive engagement plan, (8) Close plan with specific next steps, dates, and owners. Use MEDDPICC or Force Management methodology."
      },
      {
        title: "GTM Scaling Playbook",
        useCase: "Sales Scale",
        level: "advanced",
        prompt: "Write a GTM scaling playbook for [COMPANY] growing from [CURRENT ARR] to [TARGET ARR] in [TIMEFRAME]. Cover: (1) Revenue model analysis (what's working, what to scale), (2) Sales capacity planning (reps needed, ramp time, quota), (3) ICP expansion strategy (new segments, markets, use cases), (4) Sales process systematization (what must be documented and repeatable), (5) Hiring and onboarding playbook, (6) Management layer design, (7) Technology scaling requirements, (8) Key risk factors and mitigation, (9) Milestone gates for each phase of scale."
      },
      {
        title: "Negotiation Playbook for Enterprise",
        useCase: "Negotiation",
        level: "advanced",
        prompt: "Build an enterprise negotiation playbook for [COMPANY]'s sales team. Cover: (1) Negotiation preparation framework (BATNA, ZOPA, opening position), (2) Multi-party negotiation dynamics (procurement, legal, finance, champion), (3) Anchoring and framing techniques, (4) Tactical empathy application, (5) Concession strategy (what to trade, at what pace, in what sequence), (6) Pricing defense tactics, (7) Contract term negotiation guide (key terms to protect), (8) Procurement-specific countermove playbook, (9) Late-stage deal rescue plays, (10) Debrief and learning system."
      },
      {
        title: "PLG + Sales-Assisted Motion Design",
        useCase: "Product-Led Growth",
        level: "advanced",
        prompt: "Design a Product-Led Growth (PLG) + sales-assisted hybrid motion for [SAAS PRODUCT]. Cover: (1) Self-serve onboarding and activation optimization (time-to-value targets), (2) Product qualified lead (PQL) definition and scoring model, (3) PQL-to-sales handoff triggers and SLA, (4) Sales-assisted play library (expansion, enterprise upgrade, stuck accounts), (5) In-product growth loops (invitations, collaboration, sharing), (6) Freemium-to-paid conversion optimization, (7) Sales team education on PLG data signals, (8) PLG metrics dashboard, (9) PLG vs. sales channel attribution."
      },
      {
        title: "International Sales Expansion Strategy",
        useCase: "Global Sales",
        level: "advanced",
        prompt: "Build an international sales expansion strategy for [COMPANY] entering [TARGET MARKETS]. For each market: (1) Market attractiveness scoring (size, competition, regulatory, cultural fit), (2) Entry strategy (direct/partner/acquisition), (3) GTM localization requirements, (4) Sales team composition (local hires vs. overlay), (5) Channel and pricing adaptations, (6) Legal and compliance checklist, (7) Success metrics and break-even analysis. Plus: global sales governance model and HQ support structure."
      },
      {
        title: "AI-Augmented Sales System",
        useCase: "Sales AI",
        level: "advanced",
        prompt: "Design an AI-augmented sales system for [COMPANY]'s [X]-person sales team. Map: (1) Prospecting and ICP identification (AI tools and prompts), (2) Personalization at scale engine, (3) Conversation intelligence integration (Gong/Chorus analysis), (4) Sales email AI writing and optimization, (5) Predictive deal scoring, (6) AI-powered coaching recommendations, (7) Automated CRM data capture, (8) Revenue forecasting AI layer, (9) Rep enablement (real-time battle cards), (10) Governance: what AI decides vs. what humans decide, and prompt library for each use case."
      },
      {
        title: "Value Selling Methodology Design",
        useCase: "Sales Methodology",
        level: "advanced",
        prompt: "Design a custom value selling methodology for [COMPANY] selling [PRODUCT/SERVICE]. The methodology should become the company's competitive advantage in sales. Cover: (1) Value framework (how to quantify ROI for different buyer personas), (2) Discovery process for uncovering strategic value (not just tactical needs), (3) Value hypothesis development, (4) Business case co-creation with the champion, (5) CFO-level presentation standards, (6) ROI calculator design, (7) Value proof during POC/trial, (8) Reference and success story curriculum, (9) Rep training and certification program."
      },
      {
        title: "Revenue Intelligence System",
        useCase: "Revenue Operations",
        level: "advanced",
        prompt: "Architect a revenue intelligence system for [COMPANY] with [X] reps and [ARR]. Cover: (1) Data sources to integrate (CRM, email, calendar, call recording, web intent, product usage), (2) Data model and hygiene standards, (3) Rep activity analytics, (4) Pipeline analytics (velocity, stage conversion, age), (5) Deal risk scoring algorithm, (6) Coaching signal identification, (7) Forecast accuracy improvement methodology, (8) Market intelligence signals (intent data, hiring, technographics), (9) Revenue operations dashboards by audience (rep/manager/CRO/CEO), (10) AI recommendation engine brief."
      }
    ]
  },

  /* ============================================================
     AUTOMATION
     ============================================================ */
  "Automation": {
    free: [
      {
        title: "Zapier Workflow Design",
        useCase: "No-Code Automation",
        prompt: "Design a Zapier automation workflow for this process: [DESCRIBE THE MANUAL PROCESS YOU WANT TO AUTOMATE]. Specify: Trigger (what event starts the automation, in which app), Filter conditions (if any), Action steps (in order, which app, what action), any Data transformations needed, and Error handling. Estimate time saved per week. Tools involved: [LIST YOUR APPS]."
      },
      {
        title: "Python Automation Script",
        useCase: "Script Automation",
        prompt: "Write a Python script to automate this task: [DESCRIBE TASK: e.g., rename all files in a folder / send a weekly email report / scrape data from a website and save to CSV]. Include: imports needed, complete working code, inline comments explaining each section, error handling with try/except, and instructions for how to schedule it to run automatically."
      },
      {
        title: "CRM Automation Rules",
        useCase: "Sales Automation",
        prompt: "Design automation rules for [CRM: e.g., HubSpot/Salesforce/Pipedrive] to automate [PROCESS: e.g., lead routing / follow-up sequences / deal stage updates]. For each rule: trigger condition, actions to take, filters/criteria, timing, and what should NOT be automated (keep human). Goal: reduce manual data entry and ensure no leads fall through the cracks."
      }
    ],
    premium: [
      // BEGINNER (9)
      {
        title: "Email Auto-Reply Templates",
        useCase: "Email Automation",
        level: "beginner",
        prompt: "Write 5 automated email reply templates for common incoming emails at [BUSINESS TYPE]. Template 1: New inquiry acknowledgment. Template 2: Meeting request confirmation. Template 3: Out-of-office reply. Template 4: Support ticket received. Template 5: Application received. Each template: personalization tokens ([FIRST_NAME], [REQUEST_TOPIC]), response time expectation, and clear next steps."
      },
      {
        title: "Social Media Scheduler Plan",
        useCase: "Social Media Automation",
        level: "beginner",
        prompt: "Design a social media scheduling automation plan for [BRAND] using [TOOL: Buffer/Hootsuite/Later]. Set up: (1) Posting schedule per platform (days, times, frequency), (2) Content categories and rotation logic, (3) Evergreen content recycling rules, (4) Hashtag sets for each content category, (5) Auto-reposting rules for top-performing content, (6) Monitoring and response time SLA."
      },
      {
        title: "Lead Capture Automation",
        useCase: "Marketing Automation",
        level: "beginner",
        prompt: "Design a lead capture automation flow for [BUSINESS] using [TOOLS: e.g., website form + email platform + CRM]. Steps: (1) Website form fields (name, email, company, goal), (2) Thank you page/email automation, (3) Lead tagging and segmentation rules (based on form answers), (4) CRM entry creation, (5) Sales notification, (6) Lead nurture sequence trigger. Keep it simple — under 5 automation steps."
      },
      {
        title: "Invoice and Payment Automation",
        useCase: "Finance Automation",
        level: "beginner",
        prompt: "Design an invoice and payment automation workflow for [FREELANCER/SMALL BUSINESS] using [TOOLS: e.g., Stripe/QuickBooks/FreshBooks + Zapier]. Map: (1) Project completion trigger, (2) Automatic invoice generation, (3) Invoice delivery to client, (4) Payment reminder schedule (3 reminders: due date, 3 days late, 7 days late), (5) Payment confirmation and receipt automation, (6) Accounting entry creation."
      },
      {
        title: "Slack Bot Commands",
        useCase: "Team Automation",
        level: "beginner",
        prompt: "Design 5 useful Slack bot automations for a [TEAM TYPE] team. For each bot command: (1) /command name and trigger, (2) What it does when triggered, (3) Who sees the response (user/channel), (4) What data it pulls or pushes, (5) Tools it connects to. Focus on: daily standups, status updates, meeting scheduling, resource requests, and report generation."
      },
      {
        title: "Report Generation Automation",
        useCase: "Business Intelligence",
        level: "beginner",
        prompt: "Design an automated reporting workflow for [REPORT TYPE: e.g., weekly sales report / monthly marketing dashboard / daily operations summary]. Automation steps: (1) Data sources to pull from (with query or connection), (2) Data transformation logic, (3) Report template structure, (4) Scheduled generation time, (5) Distribution list and delivery method (email/Slack/shared drive), (6) Exception alerts (if a metric is off-trend). Tools: [LIST AVAILABLE TOOLS]."
      },
      {
        title: "Customer Onboarding Automation",
        useCase: "Customer Success",
        level: "beginner",
        prompt: "Map an automated customer onboarding sequence for [PRODUCT/SERVICE]. Trigger: [NEW CUSTOMER SIGN-UP/PURCHASE]. Steps: Day 0 (welcome email + login instructions), Day 1 (quick win tutorial), Day 3 (check-in email + FAQ), Day 7 (feature deep-dive + video), Day 14 (success milestone celebration + upsell soft touch), Day 30 (NPS survey + referral ask). Include: Slack/in-app notification steps if applicable."
      },
      {
        title: "File and Folder Organization Automation",
        useCase: "Productivity Automation",
        level: "beginner",
        prompt: "Write automation rules to organize files in [CLOUD STORAGE: Google Drive/Dropbox/OneDrive] for a [ROLE/TEAM]. Rules: (1) Auto-sort new uploads by file type to designated folders, (2) Rename files to a consistent naming convention ([DATE]-[PROJECT]-[DESCRIPTION]), (3) Archive files older than [X MONTHS] with no edits, (4) Share new client folders automatically with the right team members. Provide the automation logic and recommended tool (Zapier/Make/native automation)."
      },
      {
        title: "E-commerce Order Automation",
        useCase: "E-commerce Operations",
        level: "beginner",
        prompt: "Design an e-commerce order automation workflow for a [SHOPIFY/WOOCOMMERCE] store. Automate: (1) Order confirmation email (personalized), (2) Inventory low-stock alert to buyer/fulfillment team, (3) Shipping confirmation with tracking link, (4) 3-day post-delivery follow-up (review request), (5) Return/refund initiation workflow, (6) Re-engagement for customers who haven't purchased in [X DAYS]. Tools: [PLATFORM + EMAIL + INVENTORY TOOL]."
      },
      // INTERMEDIATE (12)
      {
        title: "Make (Integromat) Scenario Design",
        useCase: "Advanced Automation",
        level: "intermediate",
        prompt: "Design a complex Make (Integromat) scenario for this multi-step automation: [DESCRIBE PROCESS]. Map all modules: (1) Trigger module and data structure, (2) Each action module in sequence, (3) Filters and routers with conditions, (4) Data transformers/formatters needed, (5) Error handlers, (6) Iteration/loop logic (if processing multiple records), (7) Storage modules if needed. Include: expected run frequency, data volume, and error notification setup."
      },
      {
        title: "Marketing Automation Funnel",
        useCase: "Demand Generation",
        level: "intermediate",
        prompt: "Design a full marketing automation funnel in [PLATFORM: HubSpot/Marketo/ActiveCampaign/Klaviyo] for [BUSINESS]. Funnel stages: (1) Lead capture and enrichment, (2) MQL scoring model (point values for actions and demographics), (3) Lead nurture sequences per segment (3 segments), (4) MQL-to-SQL handoff automation, (5) Re-engagement for cold leads, (6) Suppression rules, (7) CRM sync and data hygiene automations, (8) Performance dashboard spec."
      },
      {
        title: "API Integration Automation Design",
        useCase: "Technical Automation",
        level: "intermediate",
        prompt: "Design an API integration automation between [SYSTEM A] and [SYSTEM B] to sync [DATA TYPE] in [DIRECTION: one-way/bi-directional]. Spec: (1) Authentication method, (2) Trigger (webhook/scheduled/event-based), (3) Data mapping (field A → field B, with transformation rules), (4) Conflict resolution logic (which system wins on conflict), (5) Error handling and retry logic, (6) Logging and monitoring, (7) Data volume and rate limit management, (8) Testing approach."
      },
      {
        title: "HR Onboarding Automation",
        useCase: "HR Automation",
        level: "intermediate",
        prompt: "Design an end-to-end HR onboarding automation for [COMPANY] using [HRIS + IT TOOLS]. Automation flow from 'offer accepted' to 'day 30': (1) Document collection and e-signature, (2) IT provisioning triggers (email, laptop, software licenses), (3) Org chart and directory update, (4) Team notification and buddy assignment, (5) Pre-boarding tasks for new hire, (6) Day 1 schedule automation, (7) 30/60/90 day check-in scheduling, (8) Compliance training assignment and tracking."
      },
      {
        title: "AI-Powered Content Automation",
        useCase: "Content Automation",
        level: "intermediate",
        prompt: "Design an AI-powered content automation workflow for [CONTENT TYPE: e.g., product descriptions / blog posts / social captions] at scale. Map: (1) Input data source (spreadsheet/database/API), (2) AI generation step (prompt template with data insertion), (3) Quality filtering logic, (4) Human review gate criteria, (5) Output formatting and delivery (CMS publish/email/document), (6) Performance tracking (which AI-generated content performs best), (7) Prompt iteration process based on performance."
      },
      {
        title: "Customer Service Automation",
        useCase: "Support Automation",
        level: "intermediate",
        prompt: "Design a customer service automation system for [BUSINESS] to handle [X] support tickets/day. Automate: (1) Ticket classification and routing (by topic/urgency/customer tier), (2) AI-generated first-response drafts, (3) FAQ auto-resolution (no human needed for top 10 questions), (4) Escalation triggers and rules, (5) SLA monitoring and breach alerts, (6) Customer satisfaction survey automation, (7) Agent performance metrics tracking. Tools: [HELPDESK PLATFORM + AI TOOL]."
      },
      {
        title: "Data Sync and ETL Automation",
        useCase: "Data Operations",
        level: "intermediate",
        prompt: "Design a data sync and ETL (Extract, Transform, Load) automation pipeline for [USE CASE: e.g., syncing sales data from CRM to data warehouse to BI tool]. Define: (1) Data sources with extraction method, (2) Transformation logic (cleaning, normalization, enrichment), (3) Load destination and format, (4) Sync frequency (real-time/hourly/daily), (5) Data validation checks, (6) Error logging and alerting, (7) Incremental vs. full-load strategy, (8) Tech stack recommendation with justification."
      },
      {
        title: "Automated Testing Framework",
        useCase: "QA Automation",
        level: "intermediate",
        prompt: "Design an automated testing framework for [WEB APP / API / MOBILE APP]. Cover: (1) Test types to automate (unit/integration/E2E/regression — what % each), (2) Test tool selection with justification, (3) Test data management strategy, (4) CI/CD integration, (5) Test coverage reporting, (6) Flaky test management protocol, (7) Performance testing automation, (8) Accessibility testing automation, (9) Test maintenance strategy, (10) Who writes tests and when (shift-left approach)."
      },
      {
        title: "Predictive Automation Design",
        useCase: "ML-Driven Automation",
        level: "intermediate",
        prompt: "Design a predictive automation system for [USE CASE: e.g., churn prediction / demand forecasting / anomaly detection] at [COMPANY]. Cover: (1) Prediction target definition, (2) Features/signals to collect, (3) Model selection rationale, (4) Training data requirements, (5) Prediction trigger and threshold logic, (6) Action triggered by each prediction tier, (7) Human review for high-stakes actions, (8) Model performance monitoring, (9) Retraining cadence, (10) A/B testing approach for the automation's impact."
      },
      {
        title: "Event-Driven Architecture Design",
        useCase: "Engineering Automation",
        level: "intermediate",
        prompt: "Design an event-driven automation architecture for [SYSTEM/PLATFORM]. Cover: (1) Event taxonomy (all business events with schemas), (2) Event bus/broker selection (Kafka/SQS/Pub-Sub — justify), (3) Producer and consumer mapping, (4) Event ordering and deduplication approach, (5) Dead letter queue handling, (6) Replay and backfill strategy, (7) Schema registry and versioning, (8) Monitoring and alerting for event pipelines, (9) Performance and throughput requirements, (10) Consumer idempotency requirements."
      },
      {
        title: "Workflow Orchestration Design",
        useCase: "Process Automation",
        level: "intermediate",
        prompt: "Design a workflow orchestration system for [BUSINESS PROCESS: e.g., loan approval / content publishing pipeline / order fulfillment] using [TOOL: Temporal/Airflow/n8n/Camunda]. Map: (1) All workflow states and transitions, (2) Human task steps vs. automated steps, (3) Parallel vs. sequential execution paths, (4) Timeout and SLA enforcement, (5) Compensation/rollback flows, (6) Audit trail requirements, (7) Monitoring and alerting, (8) Integration with existing systems."
      },
      {
        title: "DevOps Automation Pipeline",
        useCase: "DevOps",
        level: "intermediate",
        prompt: "Design a full DevOps automation pipeline for [APPLICATION] from code commit to production deployment. Stages: (1) Pre-commit hooks (linting, security scan), (2) CI pipeline (build, unit tests, integration tests, code coverage gate), (3) Artifact creation and versioning, (4) Staging deployment and smoke tests, (5) Performance tests, (6) Production deployment (blue-green or canary), (7) Post-deployment verification, (8) Rollback automation trigger, (9) Notification and incident creation. Tools: [LIST PREFERRED TOOLS]."
      },
      // ADVANCED (9)
      {
        title: "Hyperautomation Strategy",
        useCase: "Enterprise Automation",
        level: "advanced",
        prompt: "Design a hyperautomation strategy for [ENTERPRISE ORGANIZATION] targeting [X%] reduction in manual processes within [TIMEFRAME]. Cover: (1) Process discovery methodology (process mining approach), (2) Automation opportunity scoring (ROI, feasibility, risk), (3) Technology stack (RPA, BPM, AI/ML, integration platform), (4) Automation center of excellence design, (5) Governance framework, (6) Change management and workforce impact, (7) Implementation roadmap (waves), (8) ROI measurement model, (9) Skills and talent strategy."
      },
      {
        title: "Autonomous Agent System Design",
        useCase: "AI Agents",
        level: "advanced",
        prompt: "Design an autonomous AI agent system for [USE CASE: e.g., customer support / research assistant / operations management]. Architecture: (1) Agent type selection (ReAct/Plan-and-Execute/multi-agent — justify), (2) Tool library design (what tools the agent can use, with APIs/schemas), (3) Memory architecture (short-term, long-term, episodic), (4) Planning and reasoning framework, (5) Safety and guardrails, (6) Human-in-the-loop intervention triggers, (7) Evaluation framework for agent performance, (8) Escalation and fallback behaviors, (9) Monitoring and observability, (10) Cost management for LLM calls."
      },
      {
        title: "Enterprise RPA Implementation",
        useCase: "Robotic Process Automation",
        level: "advanced",
        prompt: "Design an enterprise RPA implementation program using [UIPATH/AUTOMATION ANYWHERE/POWER AUTOMATE] for [COMPANY]. Cover: (1) Process assessment and prioritization (criteria: frequency, volume, rule-based, stability), (2) Bot architecture (attended vs. unattended, bot farms), (3) Development standards and reusable component library, (4) Testing methodology (unit/integration/regression), (5) Exception handling framework, (6) Operations and monitoring (control room setup), (7) Security and access management, (8) Bot lifecycle management, (9) COE operating model, (10) Business case and ROI model."
      },
      {
        title: "Zero-Touch Operations Design",
        useCase: "IT/Infrastructure Automation",
        level: "advanced",
        prompt: "Design a zero-touch operations framework for [INFRASTRUCTURE/PLATFORM] with the goal of automating [X%] of operational tasks. Cover: (1) Current operational task inventory and automation potential scoring, (2) Infrastructure as Code standards (Terraform/Pulumi/CloudFormation), (3) GitOps workflow, (4) Self-healing automation (auto-remediation playbooks), (5) Capacity management automation, (6) Security and compliance automation, (7) Incident response automation, (8) Cost optimization automation, (9) Observability stack, (10) Runbook automation."
      },
      {
        title: "AI-First Business Process Redesign",
        useCase: "Digital Transformation",
        level: "advanced",
        prompt: "Redesign [BUSINESS PROCESS] from first principles with AI and automation at the center. Current state: [DESCRIBE]. Design the future state: (1) What steps are eliminated entirely, (2) What steps are fully automated, (3) What steps are AI-assisted (human with AI copilot), (4) What steps remain human-led (and why), (5) New data flows and feedback loops AI introduces, (6) Integration requirements, (7) Change management for affected roles, (8) KPIs comparing current vs. future state, (9) Implementation pathway, (10) Risk and dependency analysis."
      },
      {
        title: "Multi-Agent Orchestration System",
        useCase: "Enterprise AI",
        level: "advanced",
        prompt: "Architect a multi-agent orchestration system for [COMPLEX TASK: e.g., automated research and report writing / end-to-end sales process / autonomous coding assistant]. Design: (1) Agent roles and specializations, (2) Orchestrator agent design and routing logic, (3) Inter-agent communication protocol, (4) Shared memory and context management, (5) Task decomposition algorithm, (6) Conflict resolution between agents, (7) Quality assurance agent layer, (8) Human oversight integration points, (9) Latency and cost optimization, (10) Failure modes and recovery strategies."
      },
      {
        title: "Intelligent Document Processing System",
        useCase: "Document Automation",
        level: "advanced",
        prompt: "Design an intelligent document processing (IDP) system for [DOCUMENT TYPE: e.g., invoices / contracts / medical records / applications] at [COMPANY]. Architecture: (1) Document ingestion pipeline (sources, formats), (2) Classification model design, (3) Extraction model design (structured vs. unstructured data), (4) Validation and business rule engine, (5) Exception handling and human review queue, (6) Integration with downstream systems, (7) Continuous learning loop (from human corrections), (8) Accuracy metrics and SLA targets, (9) Privacy and data security design, (10) ROI model."
      },
      {
        title: "Automation Governance Framework",
        useCase: "Automation Management",
        level: "advanced",
        prompt: "Design an enterprise automation governance framework for [COMPANY] with [X] automated processes. Cover: (1) Automation inventory and registry, (2) Risk classification of automations (by impact/sensitivity/compliance), (3) Change management process for automation updates, (4) Testing and validation standards by risk tier, (5) Access control and authentication requirements, (6) Audit trail and compliance logging, (7) Business continuity planning for automation failures, (8) Performance SLAs and monitoring, (9) Ethics review process for AI/ML automations, (10) Sunset and decommissioning process."
      },
      {
        title: "Real-Time Automation Architecture",
        useCase: "Streaming Automation",
        level: "advanced",
        prompt: "Architect a real-time automation system for [USE CASE: e.g., fraud detection / dynamic pricing / personalization engine] processing [VOLUME: events/second]. Cover: (1) Stream processing architecture (Kafka Streams/Flink/Spark Streaming — justify), (2) Event schema design and schema registry, (3) Real-time ML inference integration, (4) Decision engine design (rules + ML hybrid), (5) Action execution with latency SLAs, (6) Stateful computation management, (7) Backpressure handling, (8) Exactly-once semantics approach, (9) Monitoring and alerting stack, (10) Disaster recovery and replay capability."
      }
    ]
  },


  /* ============================================================
     ANALYTICS
     ============================================================ */
  "Analytics": {
    free: [
      {
        title: "GA4 Event Tracking Plan",
        useCase: "Web Analytics",
        prompt: "Create a GA4 event tracking plan for [WEBSITE/APP TYPE]. Define: (1) 10 key custom events to track (name, trigger, parameters), (2) Conversion events to mark, (3) User properties to capture, (4) Recommended audiences to create from events, (5) Implementation notes for developers. Follow GA4 naming conventions (snake_case, under 40 chars)."
      },
      {
        title: "KPI Dashboard Design",
        useCase: "Business Intelligence",
        prompt: "Design a KPI dashboard for [TEAM/ROLE: e.g., marketing director / operations manager / CEO]. Include: 5 primary metrics (with target values), 8 secondary metrics, visualization type for each metric, data refresh frequency, drill-down capabilities needed, and alert thresholds. Group by: [CATEGORIES: e.g., acquisition / engagement / revenue / retention]."
      },
      {
        title: "Data Analysis Prompt",
        useCase: "Data Insights",
        prompt: "Analyze the following dataset: [PASTE DATA OR DESCRIBE IT]. Answer these questions: (1) What are the top 3 trends? (2) What anomalies or outliers exist? (3) What correlations are present? (4) What is the most actionable insight for [BUSINESS GOAL]? (5) What additional data would strengthen this analysis? Present findings in order of business impact."
      }
    ],
    premium: [
      { title: "Cohort Analysis Framework", useCase: "Retention Analytics", level: "beginner", prompt: "Design a cohort analysis framework for [PRODUCT] to track user retention. Define: cohort grouping variable (signup week/month/acquisition channel), retention metric (DAU/WAU/MAU or feature usage), observation window ([X] periods), and how to read the resulting cohort table. Include: what healthy vs. concerning retention curves look like for [PRODUCT TYPE], and the top 3 actions to improve retention based on cohort findings." },
      { title: "UTM Tracking System", useCase: "Campaign Analytics", level: "beginner", prompt: "Build a UTM tracking system for [COMPANY]'s marketing campaigns. Create: (1) UTM parameter definitions and values for source/medium/campaign/term/content, (2) Naming convention rules (lowercase, hyphens, no spaces), (3) UTM builder template for top 5 channels (paid search, email, social, display, affiliate), (4) A master UTM tracking spreadsheet structure, (5) How to report on UTM data in GA4." },
      { title: "Funnel Analysis Setup", useCase: "Conversion Analytics", level: "beginner", prompt: "Set up a conversion funnel analysis for [PRODUCT/WEBSITE]. Define: each funnel step (URL or event), expected drop-off at each step, visualization approach, segmentation cuts to apply (device, source, user type), and the top 3 hypotheses for drop-off at each step. Output: a funnel analysis report template and a prioritized optimization backlog." },
      { title: "Heatmap Analysis Guide", useCase: "UX Analytics", level: "beginner", prompt: "Write a guide for interpreting heatmap and session recording data for [PAGE TYPE: e.g., landing page / checkout / product page] using [TOOL: Hotjar/Microsoft Clarity/FullStory]. Cover: what to look for in click maps, scroll maps, and move maps; red flags that indicate UX problems; how to prioritize findings; and a template for documenting and acting on heatmap insights." },
      { title: "Monthly Analytics Report Template", useCase: "Reporting", level: "beginner", prompt: "Create a monthly analytics report template for [BUSINESS TYPE] covering [KEY CHANNELS]. Sections: Executive summary (3 bullets), month-over-month performance vs. targets, top wins and insights, underperforming areas with root causes, next month priorities, and appendix with full data tables. Keep the executive section under 1 page. Include sparkline chart recommendations for each metric." },
      { title: "E-commerce Analytics Checklist", useCase: "E-commerce", level: "beginner", prompt: "Build an e-commerce analytics health checklist for [PLATFORM: Shopify/WooCommerce]. Verify these are tracked correctly: product impressions, add-to-cart, checkout initiated, purchase (with revenue and items), refunds, and search queries. Also: set up recommended segments (new vs. returning, mobile vs. desktop, high vs. low value), and the 5 most important e-commerce reports to review weekly." },
      { title: "User Segmentation Model", useCase: "Customer Analytics", level: "beginner", prompt: "Design a user segmentation model for [PRODUCT/BUSINESS]. Segment users by: (1) Behavioral (usage frequency, feature adoption, recency), (2) Value (revenue generated, LTV tier), (3) Lifecycle stage (new, active, at-risk, churned, reactivated). For each segment: define the criteria, name the segment, describe their typical behavior, and recommend one personalized action to take per segment." },
      { title: "NPS Analysis Framework", useCase: "Customer Satisfaction", level: "beginner", prompt: "Build an NPS (Net Promoter Score) analysis framework for [COMPANY]. Cover: survey timing and triggers, sample size requirements, score calculation, segmentation of promoters/passives/detractors, qualitative theme analysis from open-ended responses, driver analysis (what most correlates with high/low scores), benchmarks for [INDUSTRY], and a closed-loop action plan for each segment." },
      { title: "SQL Analytics Query Library", useCase: "Data Analysis", level: "beginner", prompt: "Write a library of 10 essential SQL analytics queries for a [BUSINESS TYPE] database. Include queries for: (1) Daily active users, (2) 30-day retention rate, (3) Revenue by cohort month, (4) Top products by revenue, (5) Churn rate this month, (6) Average order value trend, (7) Feature adoption by plan tier, (8) Support ticket volume by category, (9) Sales rep performance, (10) Campaign attribution. Database schema: [DESCRIBE MAIN TABLES]." },
      { title: "Attribution Modeling Comparison", useCase: "Marketing Analytics", level: "intermediate", prompt: "Compare attribution models for [COMPANY]'s marketing mix: first-touch, last-touch, linear, time-decay, and position-based. For each model: how it assigns credit, which marketing situation it fits best, its known biases, and how it would change budget allocation for [DESCRIBE CURRENT CHANNEL MIX]. Recommend the best model for [COMPANY'S SALES CYCLE AND CHANNEL MIX] with justification." },
      { title: "Predictive Analytics Brief", useCase: "Advanced Analytics", level: "intermediate", prompt: "Design a predictive analytics project for [PREDICTION TARGET: e.g., churn probability / next purchase / LTV]. Cover: (1) Target variable definition, (2) Feature engineering plan (which behaviors/attributes predict the outcome), (3) Model type recommendation (logistic regression/gradient boost/neural net — justify), (4) Training data requirements, (5) Evaluation metrics, (6) Prediction score thresholds for action tiers, (7) Actions triggered at each tier, (8) Model refresh cadence." },
      { title: "Data Warehouse Schema Design", useCase: "Data Engineering", level: "intermediate", prompt: "Design a data warehouse schema for [COMPANY TYPE]'s analytics needs. Create: (1) Fact tables (transactions, events, sessions) with grain definition, (2) Dimension tables (users, products, dates, campaigns), (3) Slowly changing dimensions strategy, (4) Star vs. snowflake schema decision with rationale, (5) Key metrics as calculated fields, (6) Naming conventions, (7) Indexing strategy, (8) Recommended BI tool connection approach." },
      { title: "A/B Test Analysis Plan", useCase: "Experimentation Analytics", level: "intermediate", prompt: "Write the statistical analysis plan for an A/B test of [HYPOTHESIS]. Define: (1) Primary metric and statistical test (t-test/chi-square/Mann-Whitney — justify), (2) Significance threshold (α) and power (β), (3) Required sample size calculation (show formula), (4) Test duration, (5) Guardrail metrics to monitor, (6) Segment-level analysis plan, (7) How to handle novelty effect, (8) Decision criteria (ship/don't ship/retest), (9) How to communicate results to non-statisticians." },
      { title: "Customer Journey Analytics", useCase: "Journey Analytics", level: "intermediate", prompt: "Design a customer journey analytics framework for [BUSINESS] mapping the full journey from first touch to loyal customer. For each stage (Awareness, Consideration, Purchase, Onboarding, Engagement, Retention, Advocacy): define the key events/touchpoints to track, the drop-off metric, the success metric, and the top optimization lever. Specify data connections needed across [MARKETING / PRODUCT / SUPPORT] systems." },
      { title: "Real-Time Analytics Architecture", useCase: "Streaming Analytics", level: "intermediate", prompt: "Architect a real-time analytics system for [USE CASE: e.g., live dashboard / fraud detection / personalization] handling [X events/second]. Cover: (1) Data ingestion layer (streaming source, Kafka/Kinesis), (2) Stream processing (Flink/Spark/ksqlDB), (3) Real-time aggregation strategy, (4) Storage layer (time-series DB / columnar store), (5) Query and serving layer, (6) Dashboard refresh mechanism, (7) Latency SLA (target: under [X] seconds), (8) Scalability and failure handling." },
      { title: "Data Quality Framework", useCase: "Data Governance", level: "intermediate", prompt: "Build a data quality framework for [COMPANY]'s analytics data. Define quality dimensions: (1) Completeness (% non-null), (2) Accuracy (validation rules), (3) Consistency (cross-system checks), (4) Timeliness (freshness SLAs), (5) Uniqueness (deduplication). For each: define measurement approach, acceptable thresholds, alerting rules, and remediation process. Include a data quality scorecard template and weekly review process." },
      { title: "Analytics Strategy for Growth", useCase: "Growth Analytics", level: "intermediate", prompt: "Develop an analytics strategy for [STARTUP/COMPANY] at [STAGE] to drive growth decisions. Cover: (1) North Star Metric definition and rationale, (2) Input metrics that drive the North Star, (3) Instrumentation priorities (what to track first), (4) Data stack recommendation for the stage, (5) Analytics team structure, (6) Decision-making with data process, (7) Experiment velocity target, (8) 90-day analytics roadmap." },
      { title: "Multi-Touch Revenue Attribution", useCase: "Revenue Analytics", level: "intermediate", prompt: "Build a multi-touch revenue attribution model for [B2B/B2C COMPANY] with a [LENGTH] buying cycle across [X] channels. Cover: (1) Touchpoint data collection requirements, (2) Attribution window definition, (3) Model algorithm (Markov chain/Shapley value/custom rule-based — justify), (4) Online + offline touchpoint integration, (5) CRM and MAP data joining approach, (6) Reporting structure by channel/campaign/content, (7) How to use model output for budget optimization." },
      { title: "Executive Analytics Narrative", useCase: "Data Storytelling", level: "intermediate", prompt: "Write an executive analytics narrative for [COMPANY]'s [MONTHLY/QUARTERLY] business review. Data: [PASTE KEY METRICS]. Structure: (1) One-sentence health summary, (2) The most important positive signal and its implication, (3) The most concerning signal and its root cause hypothesis, (4) What the data says we should do next, (5) One metric we'll focus on improving next period and why. Write for a non-technical executive audience — no jargon, just insight and action." },
      { title: "Advanced Segmentation with ML", useCase: "ML Analytics", level: "advanced", prompt: "Design an ML-powered customer segmentation project for [COMPANY] using [DATA: behavioral, transactional, demographic]. Cover: (1) Feature selection and engineering, (2) Algorithm comparison (K-means vs. DBSCAN vs. hierarchical vs. GMM), (3) Optimal cluster number selection method (elbow/silhouette), (4) Cluster profiling and naming methodology, (5) Segment stability monitoring, (6) Integration into marketing automation, (7) Personalization rules per segment, (8) Incrementality testing to prove segment-based targeting works." },
      { title: "Data Mesh Architecture", useCase: "Modern Data Architecture", level: "advanced", prompt: "Design a data mesh architecture for [ENTERPRISE] with [X] business domains. Cover: (1) Domain decomposition and ownership model, (2) Data product definition standards (interface, SLOs, documentation), (3) Self-serve data infrastructure platform design, (4) Federated computational governance model, (5) Interoperability standards across domains, (6) Discovery and catalog approach, (7) Central vs. domain team responsibilities, (8) Migration path from current centralized architecture, (9) Success metrics for the data mesh." },
      { title: "Causal Inference Study Design", useCase: "Advanced Analytics", level: "advanced", prompt: "Design a causal inference study to answer: 'Does [INTERVENTION] cause [OUTCOME]?' Context: [DESCRIBE BUSINESS SCENARIO]. Evaluate methods: (1) Randomized controlled experiment (feasibility), (2) Difference-in-differences (parallel trends test), (3) Regression discontinuity (threshold availability), (4) Instrumental variables (valid instrument identification), (5) Propensity score matching. Recommend the best method, design the study, specify the estimator, and describe how to communicate the findings to business stakeholders." },
      { title: "Analytics Engineering Standards", useCase: "Data Engineering", level: "advanced", prompt: "Write analytics engineering standards for [COMPANY]'s data team using dbt (or similar). Cover: (1) Layer architecture (staging/intermediate/mart), (2) Naming conventions (tables, columns, models), (3) Documentation requirements (model, column, test coverage), (4) Testing standards (not_null, unique, referential integrity, accepted values), (5) Incremental model guidelines, (6) Exposure definitions, (7) Metrics layer design, (8) Code review checklist, (9) Deployment and CI/CD for dbt, (10) Performance optimization guidelines." },
      { title: "AI-Powered Analytics Assistant Design", useCase: "Analytics AI", level: "advanced", prompt: "Architect an AI-powered analytics assistant for [COMPANY] that lets business users query data in natural language. Cover: (1) NLP-to-SQL translation approach, (2) Schema context injection strategy, (3) Query validation and safety layer, (4) Visualization recommendation engine, (5) Ambiguity resolution dialogue design, (6) Result explanation generation, (7) Follow-up question suggestions, (8) Access control and data governance integration, (9) Hallucination prevention in data contexts, (10) Evaluation framework for answer accuracy." }
    ]
  },

  /* ============================================================
     EDUCATION
     ============================================================ */
  "Education": {
    free: [
      {
        title: "Lesson Plan Builder",
        useCase: "Teaching",
        prompt: "Create a detailed lesson plan for teaching [TOPIC] to [GRADE LEVEL / AGE GROUP / AUDIENCE]. Duration: [X MINUTES]. Include: learning objectives (3, using Bloom's taxonomy verbs), prerequisite knowledge, hook/engagement activity (5 min), main instruction with activities, formative check (mid-lesson), closing synthesis, and homework/extension. Differentiation notes for advanced and struggling learners."
      },
      {
        title: "Quiz Question Generator",
        useCase: "Assessment",
        prompt: "Generate a 10-question quiz on [TOPIC] for [LEVEL: beginner/intermediate/advanced] learners. Include: 5 multiple choice (4 options each, one clearly correct), 3 true/false with explanation, 2 short answer. For each question: the correct answer and a brief explanation of why. Difficulty should progress from easier to harder."
      },
      {
        title: "Explainer for Complex Concepts",
        useCase: "Learning",
        prompt: "Explain [COMPLEX CONCEPT] to a [TARGET LEARNER: e.g., 10-year-old / first-year university student / non-technical manager]. Use: a simple analogy they'd relate to, a real-world example, a step-by-step breakdown of the concept, a common misconception to correct, and a 'test your understanding' question at the end."
      }
    ],
    premium: [
      { title: "Course Curriculum Design", useCase: "Curriculum Development", level: "beginner", prompt: "Design a [X]-module online course on '[TOPIC]' for [TARGET LEARNER]. For each module: title, learning objectives (2–3), core content topics, one activity or exercise, one quiz question, and estimated completion time. Include: course overview, prerequisite knowledge, and a completion certificate criteria. Total course target: [X HOURS]." },
      { title: "Study Guide Creator", useCase: "Student Support", level: "beginner", prompt: "Create a study guide for [SUBJECT/TOPIC] for [EXAM / COURSE LEVEL]. Include: key concepts summary (with definitions), important formulas or frameworks, 5 practice questions with answers, common exam traps to avoid, memory aids (mnemonics or visual organizers), and a suggested study schedule for [X DAYS] before the exam." },
      { title: "Rubric Designer", useCase: "Assessment Design", level: "beginner", prompt: "Design a grading rubric for [ASSIGNMENT TYPE: e.g., essay / project / presentation / lab report] in [SUBJECT] at [GRADE LEVEL]. Include 4–5 criteria, each with 4 performance levels (Excellent/Proficient/Developing/Beginning) with clear descriptors. Total points: [X]. Add a brief instructions section for how to use the rubric consistently." },
      { title: "IEP Goal Writer", useCase: "Special Education", level: "beginner", prompt: "Write 3 SMART IEP (Individualized Education Program) goals for a student with [DISABILITY/LEARNING NEED] in the area of [SKILL AREA: reading/math/writing/social skills/behavior]. Each goal: baseline performance, measurable annual goal, method of measurement, and review frequency. Language should be clear, specific, and parent-friendly." },
      { title: "Parent Communication Template", useCase: "School Communication", level: "beginner", prompt: "Write parent communication templates for [GRADE LEVEL] teachers. Templates: (1) Beginning of year welcome letter, (2) Progress concern notice, (3) Behavior incident report, (4) Positive achievement celebration, (5) Conference invitation. Each template: warm but professional tone, clear and jargon-free, and easy to personalize with student name and specific details." },
      { title: "Vocabulary Building Activity", useCase: "Language Arts", level: "beginner", prompt: "Design a vocabulary building activity set for [X] target words from [SUBJECT / READING LEVEL]. For each word: definition in student-friendly language, example sentence in context, a visual or analogy prompt, a fill-in-the-blank practice sentence, and a personal connection question. Include a week-long practice schedule." },
      { title: "Classroom Discussion Prompts", useCase: "Active Learning", level: "beginner", prompt: "Generate 15 discussion questions for [TOPIC / BOOK / HISTORICAL EVENT] for [GRADE LEVEL / AGE GROUP]. Mix: 5 knowledge/recall questions, 5 analysis/interpretation questions, 5 opinion/application questions. Sequence them so discussion flows from concrete to abstract. Include Socratic seminar guidelines for students." },
      { title: "Differentiated Instruction Plan", useCase: "Inclusive Education", level: "beginner", prompt: "Create a differentiated instruction plan for teaching [LESSON TOPIC] to a class with mixed abilities. Design three versions: (1) Support version for struggling learners (scaffold, visual aids, simplified text), (2) Standard version for on-level learners, (3) Extension version for advanced learners (higher-order thinking, independent research). All versions meet the same core learning objective." },
      { title: "Field Trip Planning Guide", useCase: "Experiential Learning", level: "beginner", prompt: "Plan an educational field trip to [DESTINATION] for [GRADE LEVEL, X STUDENTS]. Include: educational objectives aligned to [CURRICULUM STANDARDS], pre-trip preparation activities (1 lesson), on-site activities and observation guides, discussion questions for the visit, post-trip reflection assignment, permission slip template, and safety/logistics checklist." },
      { title: "Project-Based Learning (PBL) Design", useCase: "PBL", level: "intermediate", prompt: "Design a Project-Based Learning unit for [GRADE/LEVEL] students on the topic of [TOPIC] spanning [X WEEKS]. Include: driving question, final product and public audience, learning objectives (content + skills), project calendar (week-by-week milestones), student roles (if team project), scaffolding checkpoints, resources needed, assessment rubric, and reflection protocol. Align to [STANDARDS]." },
      { title: "Flipped Classroom Design", useCase: "Instructional Design", level: "intermediate", prompt: "Design a flipped classroom unit for [TOPIC] for [GRADE/LEVEL]. For each lesson: (1) Pre-class content (video script, reading, or interactive activity — 10–15 min), (2) Comprehension check questions (3–5 questions students answer before class), (3) In-class activity using class time for application/discussion/problem-solving, (4) Teacher role during in-class time. Include: technology tools needed and parent/student communication." },
      { title: "E-Learning Course Script", useCase: "EdTech Content", level: "intermediate", prompt: "Write a 10-minute e-learning module script for '[MODULE TITLE]' in a course about [COURSE TOPIC] for [AUDIENCE]. Include: learning objective statement at start, engaging narration (conversational, not lecture-style), knowledge check questions at key points, scenario-based example, summary slide narration, and knowledge assessment (5 questions). Note slide transitions with [NEXT SLIDE] cues." },
      { title: "Competency Framework Design", useCase: "Workforce Education", level: "intermediate", prompt: "Design a competency framework for [JOB ROLE / PROGRAM] with [X] core competencies. For each competency: name, definition, why it matters, and 4 proficiency levels (emerging/developing/proficient/expert) with behavioral descriptors at each level. Use to guide: hiring assessments, performance reviews, learning pathways, and promotion criteria." },
      { title: "Learning Path Designer", useCase: "L&D / Online Learning", level: "intermediate", prompt: "Design a personalized learning path for [LEARNER TYPE] wanting to achieve [LEARNING GOAL] in [TIMEFRAME]. Phases: (1) Foundation (free resources + core concepts), (2) Skill Building (courses + practice projects), (3) Application (real-world project + portfolio piece), (4) Mastery (advanced course + community/mentorship). For each phase: specific resources, estimated hours, and milestone assessment." },
      { title: "Assessment Blueprint", useCase: "Test Design", level: "intermediate", prompt: "Create an assessment blueprint for a [UNIT / COURSE FINAL] exam on [TOPIC] for [LEVEL]. Blueprint table: learning objective, Bloom's taxonomy level, number of questions, question types, point value, and time allocation. Write 2 sample questions for each objective. Total questions: [X]. Time limit: [X MINUTES]. Include: validity check and bias review criteria." },
      { title: "Mentorship Program Design", useCase: "Mentorship", level: "intermediate", prompt: "Design a structured mentorship program for [CONTEXT: e.g., new teacher induction / university first-year / early career professionals]. Cover: (1) Program goals and outcomes, (2) Mentor-mentee matching criteria, (3) Program structure (meeting cadence, session guides for 6 months), (4) Conversation frameworks for each stage (establishing rapport / goal setting / skill building / reflection), (5) Resources for mentors, (6) Program evaluation approach." },
      { title: "Micro-Learning Module Design", useCase: "Corporate Training", level: "intermediate", prompt: "Design a micro-learning module on [TOPIC] for [AUDIENCE] that can be completed in 5 minutes. Format: (1) Hook — a relatable scenario or surprising fact (30 seconds), (2) Core concept — the single most important thing to learn (2 minutes), (3) Example — one concrete application (1 minute), (4) Practice — one interaction (drag and drop/scenario/quiz) (1 minute), (5) Takeaway card — one sentence they'll remember. Design for mobile-first consumption." },
      { title: "Educational Game Design", useCase: "Gamification", level: "intermediate", prompt: "Design an educational game for teaching [CONCEPT] to [AGE GROUP / AUDIENCE]. Specify: (1) Game type (board game / card game / digital / role-play), (2) Learning objectives integrated into gameplay, (3) Core game mechanics and rules, (4) Progression and difficulty curve, (5) Feedback mechanisms (how players know they're learning), (6) Assessment integration, (7) Materials needed, (8) Teacher/facilitator guide for debrief. Fun-first, learning-embedded approach." },
      { title: "Adaptive Learning System Design", useCase: "EdTech", level: "advanced", prompt: "Architect an adaptive learning system for [SUBJECT/SKILL] targeting [LEARNER POPULATION]. Cover: (1) Learner model (what is tracked: knowledge state, learning style, pace, error patterns), (2) Content model (how content is tagged: difficulty, concept, prerequisite map), (3) Adaptation algorithm (how path changes based on performance), (4) Assessment integration (diagnostic + formative + summative), (5) Spaced repetition engine, (6) Teacher dashboard design, (7) Equity considerations (access, language, ability), (8) Effectiveness evaluation methodology." },
      { title: "AI Tutor Prompt System", useCase: "AI in Education", level: "advanced", prompt: "Design a complete AI tutoring prompt system for [SUBJECT] at [LEVEL]. Create: (1) System prompt for the AI tutor persona (Socratic style, never gives answers directly), (2) Diagnostic assessment prompt sequence (5 questions to assess prior knowledge), (3) Explanation prompt templates for 3 difficulty levels, (4) Hint ladder (3 levels of hints before revealing answer), (5) Misconception detection prompts for top 5 common errors in [SUBJECT], (6) Encouragement and growth mindset language guidelines, (7) Progress summarization prompt." },
      { title: "Learning Science Application Guide", useCase: "Instructional Design", level: "advanced", prompt: "Apply learning science principles to redesign [COURSE / TRAINING PROGRAM / LEARNING EXPERIENCE]. For each principle — (1) Spaced repetition, (2) Interleaving, (3) Retrieval practice, (4) Elaborative interrogation, (5) Concrete examples, (6) Dual coding, (7) Desirable difficulties — describe the current approach, the evidence-based improvement, and specific implementation instructions. Include a redesigned sample lesson incorporating all 7 principles." },
      { title: "EdTech Product Curriculum Design", useCase: "EdTech Product", level: "advanced", prompt: "Design the full curriculum architecture for an EdTech product teaching [SUBJECT] to [AUDIENCE]. Cover: (1) Learning taxonomy and concept map, (2) Scope and sequence (what's taught, in what order, and why), (3) Content types mix (video/text/interactive/project — rationale for each), (4) Assessment strategy (placement/formative/summative/mastery-based), (5) Personalization logic, (6) Completion and credential design, (7) Accessibility standards (WCAG, closed captions, reading levels), (8) Localization approach, (9) Learning outcome measurement methodology." },
      { title: "Institutional Learning Strategy", useCase: "Education Leadership", level: "advanced", prompt: "Develop a 3-year learning and development strategy for [INSTITUTION: school/university/corporate L&D]. Cover: (1) Current state assessment (skills gaps, learning culture, infrastructure), (2) Strategic learning priorities aligned to [INSTITUTIONAL GOALS], (3) Learning ecosystem design (modalities, platforms, social learning), (4) Content strategy and curation approach, (5) Faculty/trainer capability development, (6) Technology roadmap, (7) Equity and access framework, (8) Measurement model (learning → behavior → business impact), (9) Budget framework, (10) Governance and ownership." }
    ]
  },

  /* ============================================================
     HR
     ============================================================ */
  "HR": {
    free: [
      {
        title: "Job Description Writer",
        useCase: "Recruiting",
        prompt: "Write a compelling job description for a [JOB TITLE] role at [COMPANY NAME], a [COMPANY DESCRIPTION]. Include: a 2-sentence company intro (mission and culture), role overview, key responsibilities (6–8 bullets), required qualifications (5–6), nice-to-have qualifications (3), what we offer (compensation, benefits, culture perks), and an inclusive closing statement. Use inclusive language and avoid gendered terms."
      },
      {
        title: "Interview Question Bank",
        useCase: "Hiring",
        prompt: "Generate an interview question bank for hiring a [JOB TITLE]. Include: 5 behavioral questions (STAR format), 3 situational/hypothetical questions, 4 role-specific technical questions, 2 culture-add questions, and 2 candidate questions to invite (good sign questions). For each behavioral question, include: what you're assessing and green/red flag answers."
      },
      {
        title: "Employee Onboarding Plan",
        useCase: "Onboarding",
        prompt: "Create a 30-60-90 day onboarding plan for a new [JOB TITLE] at [COMPANY]. Each phase: learning objectives, key people to meet, tasks to complete, systems to access, and success milestones. Include: Day 1 checklist (logistics + culture), first week priorities, and a 'getting to know the team' activity. Manager and buddy responsibilities noted throughout."
      }
    ],
    premium: [
      { title: "HR Policy Template", useCase: "HR Compliance", level: "beginner", prompt: "Write an HR policy for [POLICY TYPE: e.g., remote work / PTO / code of conduct / social media use] for [COMPANY TYPE]. Sections: purpose, scope, policy statement, procedures, responsibilities (employee and manager), consequences of non-compliance, and review date. Language: clear, professional, and legally neutral. Length: 1–2 pages." },
      { title: "Exit Interview Guide", useCase: "Employee Relations", level: "beginner", prompt: "Write an exit interview guide for [COMPANY]. Include: 10 open-ended questions covering reasons for leaving, manager feedback, culture assessment, role satisfaction, what the company does well, and improvement suggestions. Add: a scoring system for quantitative data, instructions for the interviewer (confidentiality assurance, active listening tips), and a data synthesis template." },
      { title: "Employee Survey Design", useCase: "Employee Engagement", level: "beginner", prompt: "Design a [QUARTERLY/ANNUAL] employee engagement survey for [COMPANY SIZE/TYPE]. Include: 5 engagement index questions (Likert scale), 10 topic questions covering [AREAS: manager relationship / growth / inclusion / wellbeing / company direction], 2 open-ended questions, and 3 demographic questions. Keep total completion time under 8 minutes. Include: response rate tactics and action-planning guide." },
      { title: "Compensation Benchmarking Guide", useCase: "Compensation", level: "beginner", prompt: "Write a compensation benchmarking guide for [ROLE: JOB TITLE] in [LOCATION/MARKET]. Cover: which data sources to use (levels.fyi / Glassdoor / Radford / Comptryx / LinkedIn Salary), how to define the peer group (companies of similar size/stage/industry), how to read percentile data (25th/50th/75th), total compensation components to benchmark, and how to present findings to justify a comp adjustment." },
      { title: "PIP (Performance Improvement Plan) Template", useCase: "Performance Management", level: "beginner", prompt: "Write a Performance Improvement Plan (PIP) template for an employee in [ROLE] who is underperforming in [AREA OF CONCERN]. Include: performance gap description (specific, behavioral, factual), performance expectations (SMART goals for 30/60/90 days), support provided by manager, check-in schedule, consequences if improvement not achieved, and employee acknowledgment section. Tone: constructive, not punitive." },
      { title: "Candidate Rejection Email", useCase: "Candidate Experience", level: "beginner", prompt: "Write 3 candidate rejection email templates for different stages: (1) After application review (no interview), (2) After first interview, (3) After final round interview. Each template: professional, empathetic, brief, encouraging of future applications, and legally safe (no discriminatory language, no specific feedback that could create liability). Personalize with [NAME] and [ROLE] tokens." },
      { title: "Team Culture Norms Workshop", useCase: "Culture Building", level: "beginner", prompt: "Design a 60-minute team culture norms workshop for a [TEAM SIZE] team. Include: warm-up activity (10 min), values identification exercise (15 min), behaviors brainstorm (what we want to see more/less of) (15 min), norms agreement drafting (10 min), commitment ceremony (5 min), and follow-up process (5 min). Facilitator notes for each section. Output: a team norms document template." },
      { title: "Diversity Job Posting Audit", useCase: "DEI Recruiting", level: "beginner", prompt: "Audit the following job posting for diversity, equity, and inclusion: [PASTE JOB POSTING]. Check for: gendered language (he/she/his), unnecessarily exclusionary requirements (degree requirements where not needed), cultural bias in language, inaccessible formatting, missing inclusion statement, and salary transparency. Provide a rewritten version of flagged sections." },
      { title: "1:1 Meeting Template", useCase: "Management", level: "beginner", prompt: "Create a weekly 1:1 meeting template for managers and direct reports. Sections: (1) Employee check-in (how are you doing?), (2) Wins since last 1:1, (3) Blockers and where manager can help, (4) Project status updates (key items only), (5) Development and career conversation (monthly rotating topic), (6) Manager feedback to employee, (7) Employee feedback to manager, (8) Action items with owners. Time: 30 minutes total." },
      { title: "Talent Acquisition Strategy", useCase: "Recruiting Strategy", level: "intermediate", prompt: "Build a talent acquisition strategy for [COMPANY] planning to hire [X ROLES] in [TIMEFRAME]. Cover: (1) Employer brand positioning, (2) Sourcing channel mix (job boards, LinkedIn, employee referrals, agencies, events), (3) Candidate experience design, (4) Interview process standardization, (5) Diverse candidate pipeline tactics, (6) Offer strategy (comp, equity, benefits narrative), (7) Recruiter capacity planning, (8) ATS and tooling, (9) KPIs (time-to-fill, offer acceptance rate, quality of hire)." },
      { title: "HR OKRs Framework", useCase: "HR Strategy", level: "intermediate", prompt: "Write quarterly OKRs for the HR function at [COMPANY STAGE/SIZE] focused on [TOP HR PRIORITIES]. Create 3 Objectives with 3 Key Results each covering: talent acquisition, employee engagement/retention, people development, HR operations efficiency, and DEI progress. Each KR: specific metric, current baseline, target, and measurement method. Ensure KRs are leading indicators, not just lagging metrics." },
      { title: "Succession Planning Framework", useCase: "Talent Management", level: "intermediate", prompt: "Design a succession planning framework for [COMPANY] for [X] critical roles. Cover: (1) Role criticality assessment, (2) Successor identification process, (3) Readiness rating (ready now / 1–2 years / 3+ years), (4) Individual development plan template for successors, (5) Talent review meeting agenda and cadence, (6) Risk mitigation for single points of failure, (7) How to communicate (or not communicate) succession status to employees, (8) Board reporting format." },
      { title: "Learning & Development Strategy", useCase: "L&D", level: "intermediate", prompt: "Develop a Learning & Development strategy for [COMPANY] with [X] employees. Cover: (1) Skills gap analysis methodology, (2) Learning priorities aligned to business strategy, (3) Learning modalities mix (formal/on-the-job/social), (4) Manager capability development program, (5) Leadership development pipeline, (6) Learning platform and content strategy, (7) Measurement (Level 1–4 Kirkpatrick), (8) Budget framework, (9) L&D team structure." },
      { title: "Total Rewards Design", useCase: "Compensation & Benefits", level: "intermediate", prompt: "Design a total rewards strategy for [COMPANY TYPE/STAGE]. Cover: (1) Compensation philosophy (pay positioning vs. market — 25th/50th/75th), (2) Salary structure design (bands, grades), (3) Equity program design, (4) Variable pay / bonus structure, (5) Benefits philosophy and offerings, (6) Non-monetary rewards (flexible work, recognition, development budget), (7) Pay equity analysis approach, (8) Total rewards communication strategy, (9) Annual review and benchmarking cycle." },
      { title: "Manager Effectiveness Program", useCase: "Leadership Development", level: "intermediate", prompt: "Design a manager effectiveness program for [COMPANY]'s [X] people managers. Cover: (1) Manager competency model (5–7 competencies), (2) 360 feedback assessment design, (3) Manager training curriculum (core skills: feedback, coaching, hiring, performance management), (4) New manager onboarding program, (5) Peer learning cohorts, (6) Manager community of practice design, (7) Coaching support access, (8) How manager effectiveness is measured and tied to performance review." },
      { title: "HR Technology Roadmap", useCase: "HR Tech", level: "intermediate", prompt: "Build an HR technology roadmap for [COMPANY SIZE/STAGE]. Audit current tools and define: (1) Core HR system (HRIS) requirements, (2) Recruiting tech stack (ATS, sourcing, assessments), (3) Performance management system, (4) L&D platform, (5) People analytics layer, (6) Employee experience tools (engagement, recognition), (7) Integration and data flow architecture, (8) Implementation sequence with priorities, (9) Budget estimate, (10) Change management plan." },
      { title: "DEI Strategy and Action Plan", useCase: "Diversity & Inclusion", level: "intermediate", prompt: "Develop a DEI strategy and 12-month action plan for [COMPANY]. Cover: (1) Current state assessment (representation data, inclusion survey, pay equity), (2) DEI vision and commitments, (3) Focus areas (hiring / belonging / advancement / pay equity / supplier diversity), (4) Accountability structure (DEI council, executive sponsor), (5) 12-month action plan with owners and metrics, (6) Budget requirements, (7) External reporting and transparency commitments, (8) Employee communication approach." },
      { title: "Change Management HR Plan", useCase: "Org Change", level: "intermediate", prompt: "Create an HR-led change management plan for [CHANGE INITIATIVE: e.g., org restructure / return to office / new performance system / merger integration]. Cover: (1) Stakeholder analysis and impact assessment, (2) Communication plan (what, when, who, channel), (3) Manager enablement (talking points, FAQs, coaching), (4) Employee support resources, (5) Resistance anticipation and mitigation, (6) Training plan, (7) Feedback collection mechanisms, (8) Success metrics and pulse check schedule." },
      { title: "HR Analytics Capability Build", useCase: "People Analytics", level: "advanced", prompt: "Design a people analytics capability build for [COMPANY] going from [CURRENT MATURITY: descriptive reporting] to [TARGET: predictive and prescriptive analytics] in 18 months. Cover: (1) Data infrastructure requirements (HRIS data quality, integration with business data), (2) Team structure and skills needed, (3) Use case prioritization (retention prediction, hiring quality, engagement drivers, span of control), (4) Analytical tool selection, (5) Privacy and ethics framework, (6) Stakeholder education plan, (7) Milestone roadmap with quick wins." },
      { title: "Organizational Design Principles", useCase: "Org Design", level: "advanced", prompt: "Develop organizational design principles for [COMPANY] undergoing [GROWTH/RESTRUCTURE/TRANSFORMATION]. Cover: (1) Design criteria (what the org structure must optimize for), (2) Structural options analysis (functional vs. divisional vs. matrix vs. squad model — pros/cons for this context), (3) Span of control guidelines, (4) Decision rights framework (RACI at the org level), (5) Layer and title architecture, (6) Team topology guidelines, (7) Cross-functional coordination mechanisms, (8) Implementation and transition plan, (9) Success metrics." },
      { title: "Executive Compensation Design", useCase: "C-Suite Comp", level: "advanced", prompt: "Design an executive compensation program for [COMPANY STAGE: pre-IPO / public / private equity-backed]. Cover: (1) Philosophy and peer group selection, (2) Base salary benchmarking, (3) Annual incentive plan (metrics, weighting, payout curve), (4) Long-term incentive design (equity type, grant sizing, vesting schedule, performance conditions), (5) Benefits and perquisites, (6) Clawback provisions, (7) Change-in-control provisions, (8) Board compensation committee governance, (9) Proxy/disclosure considerations if public." },
      { title: "Future of Work HR Strategy", useCase: "HR Strategy", level: "advanced", prompt: "Develop a future of work strategy for [COMPANY] addressing: (1) Work model design (office/remote/hybrid — decision framework, not mandate), (2) AI and automation's impact on the workforce (role impact assessment, reskilling plan), (3) Talent market changes (gig economy integration, skills-based hiring), (4) Employee wellbeing as a strategic priority, (5) Generational workforce dynamics, (6) New manager contract in a distributed world, (7) Culture and belonging without physical proximity, (8) HR capability requirements for the future, (9) 3-year scenario planning." }
    ]
  },


  /* ============================================================
     SOCIAL MEDIA
     ============================================================ */
  "Social Media": {
    free: [
      { title: "Viral Post Formula", useCase: "Organic Growth", prompt: "Write 3 viral-style social media posts for [BRAND/CREATOR] on [PLATFORM] about [TOPIC]. Each post should use a different viral formula: (1) Controversial opinion / hot take, (2) Storytelling with a surprising twist, (3) Listicle with an unexpected #1. Include hook, body, and a CTA that drives comments. Target audience: [AUDIENCE]." },
      { title: "Social Media Bio Optimizer", useCase: "Profile Optimization", prompt: "Rewrite the social media bio for [PLATFORM] for [NAME/BRAND]. Current bio: [PASTE CURRENT BIO]. Make it: keyword-rich for discoverability, value-proposition clear (what do followers get?), personality-forward, and include a CTA. Character limits: Twitter/X = 160, Instagram = 150, LinkedIn = 220, TikTok = 80. Provide a version for each platform." },
      { title: "Content Pillar Strategy", useCase: "Content Strategy", prompt: "Define a content pillar strategy for [BRAND/CREATOR] in the [NICHE] space on [PLATFORMS]. Create 4–5 content pillars: for each — pillar name, what it covers, why the audience cares, content format ideas (5 per pillar), and posting frequency. Ensure pillars balance educational, entertaining, and promotional content at a 70/20/10 ratio." }
    ],
    premium: [
      { title: "Instagram Reel Script", useCase: "Short-Form Video", level: "beginner", prompt: "Write a 30-second Instagram Reel script for [CREATOR/BRAND] on the topic of [TOPIC]. Hook (0–3s): a bold statement or question. Value delivery (3–25s): 3 quick tips or a story. Close (25–30s): CTA to follow or comment. Include on-screen text suggestions and music vibe direction. Tone: [ENERGETIC/EDUCATIONAL/RELATABLE]." },
      { title: "LinkedIn Post Templates", useCase: "Professional Networking", level: "beginner", prompt: "Write 5 LinkedIn post templates for [JOB TITLE / PERSONAL BRAND] in [INDUSTRY]. Post types: (1) Lesson from a mistake, (2) Unpopular opinion, (3) Career milestone + insight, (4) Industry trend observation, (5) Question to the community. Each post: hook line, 3-paragraph body (short paragraphs, white space), and an engagement question at the end." },
      { title: "Twitter/X Thread Builder", useCase: "Twitter Growth", level: "beginner", prompt: "Write a Twitter/X thread on [TOPIC] for [AUDIENCE]. Thread structure: Tweet 1 (hook — promise the value), Tweets 2–8 (value delivery — one insight per tweet), Tweet 9 (summary or actionable takeaway), Tweet 10 (CTA: follow/RT/link). Each tweet: under 280 characters, punchy, standalone value. Use thread numbering (1/ 2/ etc.)." },
      { title: "TikTok Content Strategy", useCase: "TikTok Growth", level: "beginner", prompt: "Build a 30-day TikTok content strategy for [CREATOR/BRAND] in [NICHE]. Include: 20 video concepts (mix of trends, educational, entertaining, and POV formats), posting schedule (frequency and best times), hook variations for each video type, sound/music direction, hashtag strategy (mix of niche + broad), and engagement tactics (reply with video, duet, stitch)." },
      { title: "Pinterest Pin Strategy", useCase: "Pinterest Marketing", level: "beginner", prompt: "Create a Pinterest content strategy for [BRAND/BLOG] in [NICHE]. Include: 5 board topics with keywords, pin design direction (image style, text overlay formulas), 10 pin title templates (SEO-friendly), pin description template (keyword-rich, 2–3 sentences), pinning schedule (frequency, mix of original and repins), and Rich Pin setup checklist." },
      { title: "YouTube Channel Strategy", useCase: "YouTube Growth", level: "beginner", prompt: "Build a YouTube channel strategy for [CHANNEL CONCEPT] targeting [AUDIENCE]. Include: channel positioning (unique angle vs. competitors), 5 content series concepts (each with 5 episode ideas), upload schedule, channel trailer script (60 seconds), about page copy, and a 90-day launch plan (content calendar + promotion activities)." },
      { title: "Community Management Response Templates", useCase: "Community Management", level: "beginner", prompt: "Write 10 community management response templates for [BRAND]'s social media. Cover: (1) Positive review/comment, (2) Product question, (3) Complaint or negative experience, (4) Feature request, (5) Spam or inappropriate comment, (6) Media/press inquiry, (7) Influencer collaboration request, (8) Employee discount request, (9) Trolling response, (10) Crisis-related comment. Each: brand voice, empathetic, under 100 words." },
      { title: "Hashtag Strategy Builder", useCase: "Discoverability", level: "beginner", prompt: "Build a hashtag strategy for [BRAND/CREATOR] on [PLATFORM: Instagram/TikTok/LinkedIn] in the [NICHE] space. Create 5 hashtag sets (one per content pillar): each set has 15 hashtags mixing (large: 1M+ / medium: 100K–1M / niche: under 100K). Include: branded hashtag, 2 campaign hashtags, and rules for rotating sets to avoid shadowban." },
      { title: "Social Proof Campaign", useCase: "User-Generated Content", level: "beginner", prompt: "Design a UGC (User Generated Content) and social proof campaign for [BRAND]. Include: hashtag campaign concept and name, how to ask for UGC (email, packaging insert, post CTA), incentive structure, curation and permission process, how to repost and credit creators, goal (testimonials, product shots, reviews), and a 30-day campaign calendar." },
      { title: "Social Media Audit Template", useCase: "Strategy", level: "intermediate", prompt: "Conduct a social media audit for [BRAND]. For each platform ([LIST PLATFORMS]): current follower count and growth rate, engagement rate benchmark vs. industry, top 5 performing posts (format, topic, why they worked), underperforming content patterns, profile optimization gaps, content gap vs. competitors, and 5 priority improvements. Include an overall score and 30/60/90 day action plan." },
      { title: "Influencer Marketing Campaign", useCase: "Influencer Strategy", level: "intermediate", prompt: "Design a complete influencer marketing campaign for [BRAND] launching [PRODUCT/OFFER]. Cover: (1) Influencer tier strategy (nano/micro/macro/mega — mix and rationale), (2) Discovery and vetting criteria, (3) Outreach and negotiation process, (4) Brief template (campaign concept, dos and don'ts, deliverables, deadlines), (5) Content approval workflow, (6) Compensation model (gifting/flat fee/commission), (7) FTC disclosure guidelines, (8) Performance metrics (reach, EMV, conversions), (9) Post-campaign reporting template." },
      { title: "Social Selling Playbook", useCase: "B2B Social", level: "intermediate", prompt: "Build a LinkedIn social selling playbook for [SALES TEAM/INDIVIDUAL] in [INDUSTRY]. Cover: (1) Profile optimization checklist, (2) Daily activity routine (30-minute social selling habit), (3) Connection request strategy, (4) Content creation and sharing cadence, (5) Engagement tactics (comment strategy, thought leadership), (6) DM conversation framework (research → warm connection → soft value offer), (7) Prospect research process, (8) Handoff to CRM/email sequence triggers, (9) SSI (Social Selling Index) improvement tips." },
      { title: "Crisis Communication Playbook (Social)", useCase: "Crisis Management", level: "intermediate", prompt: "Write a social media crisis communication playbook for [BRAND]. Cover: (1) Crisis tier definitions (Tier 1/2/3 by severity), (2) Monitoring and early warning signals, (3) Internal escalation process, (4) Response time SLAs by tier, (5) Response templates for each tier and common crisis types (product issue / employee misconduct / data breach / viral backlash), (6) What NOT to say, (7) Holding statement template, (8) Platform-specific response strategies, (9) Post-crisis audit process." },
      { title: "Social Commerce Strategy", useCase: "Social Commerce", level: "intermediate", prompt: "Design a social commerce strategy for [BRAND] to sell products directly through [PLATFORMS: Instagram/TikTok/Pinterest/Facebook]. Cover: (1) Product catalog setup and tagging, (2) Shoppable content formats per platform, (3) Checkout flow optimization, (4) Live shopping event strategy, (5) Affiliate and creator commerce program, (6) Social proof integration (reviews, UGC on product pages), (7) Retargeting strategy from social engagement, (8) Revenue targets and metrics." },
      { title: "Employee Advocacy Program", useCase: "Brand Amplification", level: "intermediate", prompt: "Design an employee advocacy social media program for [COMPANY]. Cover: (1) Program goals and KPIs, (2) Opt-in recruitment and incentive design, (3) Content hub (curated and original content for employees to share), (4) Social media guidelines (what's encouraged, what's off-limits), (5) Training program for employees, (6) Platform recommendation (Bambu/Sociabble/LinkedIn Elevate), (7) Recognition and gamification, (8) Measurement (reach amplification, earned media value, hiring impact)." },
      { title: "Paid Social Media Strategy", useCase: "Paid Social", level: "intermediate", prompt: "Build a paid social media strategy for [COMPANY] with a [MONTHLY BUDGET] targeting [AUDIENCE]. Cover: (1) Platform allocation (Meta/TikTok/LinkedIn/Pinterest — justify split), (2) Campaign objective structure (awareness/consideration/conversion), (3) Audience targeting layers (custom, lookalike, interest, retargeting), (4) Creative strategy (formats, hooks, value props), (5) A/B testing plan, (6) Funnel flow (from cold to conversion), (7) Attribution setup, (8) KPIs and efficiency targets (CPC, CPM, ROAS), (9) Optimization cadence." },
      { title: "Social Listening Strategy", useCase: "Brand Intelligence", level: "intermediate", prompt: "Design a social listening strategy for [BRAND] using [TOOL: Brandwatch/Sprout/Mention/Hootsuite]. Cover: (1) Listening objectives (brand health / competitor intel / trend spotting / crisis detection / customer insights), (2) Query and keyword setup, (3) Sentiment analysis framework, (4) Competitor monitoring setup, (5) Share of voice methodology, (6) Reporting templates and cadence, (7) Alert setup for crisis signals, (8) How insights feed into content strategy and product roadmap." },
      { title: "Platform Algorithm Mastery Guide", useCase: "Organic Growth", level: "intermediate", prompt: "Write a comprehensive guide to mastering the [PLATFORM: Instagram/TikTok/LinkedIn/YouTube] algorithm for [CREATOR TYPE] in [NICHE]. Cover: (1) How the algorithm currently works (ranking signals), (2) Content signals that boost distribution, (3) Engagement patterns that matter most, (4) Posting time and frequency optimization, (5) Format-specific optimization (Reels vs. carousels vs. stories / long vs. short), (6) Community signals, (7) Common mistakes that suppress reach, (8) A 30-day algorithm growth experiment." },
      { title: "Social Media Agency Pitch", useCase: "Agency Business", level: "intermediate", prompt: "Write a social media agency pitch for [CLIENT BRAND] showing how [AGENCY NAME] would transform their social presence. Sections: Current state audit (gaps and opportunities), Proposed strategy (positioning, pillars, platform focus), Creative direction (tone, visual style, content formats), Campaign concept (1 hero campaign idea), Results and case studies, Proposed team and process, Pricing tiers (3 options), Next steps. Make it visually structured, bold, and specific — not generic." },
      { title: "Creator Monetization Strategy", useCase: "Creator Economy", level: "advanced", prompt: "Build a monetization strategy for a creator with [X FOLLOWERS] in the [NICHE] space across [PLATFORMS]. Revenue streams to develop: (1) Brand deals (rate card, pitch process, ideal brand profile), (2) Digital products (what to create, pricing, funnel), (3) Membership/subscription (platform choice, tier design, content strategy), (4) Affiliate marketing (category selection, disclosure, integration), (5) Live events or workshops, (6) Licensing content. 12-month revenue roadmap with monthly targets per stream." },
      { title: "Social Media Holding Company Strategy", useCase: "Media Business", level: "advanced", prompt: "Design a multi-brand social media holding company strategy for [PARENT BRAND] managing [X] accounts across [PLATFORMS]. Cover: (1) Brand architecture (how each account is positioned and differentiated), (2) Content production model (centralized vs. decentralized), (3) Audience crossover and funnel strategy, (4) Shared services (analytics, tools, legal, contracts), (5) Account-level P&L model, (6) Talent and creator acquisition strategy, (7) Cross-promotion rules, (8) Acquisition criteria for new accounts, (9) Monetization optimization across the portfolio." },
      { title: "AI-Powered Social Media System", useCase: "Social Media Automation", level: "advanced", prompt: "Design an AI-powered social media management system for [COMPANY / AGENCY managing X clients]. Architecture: (1) Content ideation pipeline (AI trend monitoring → concept generation → brief creation), (2) AI-assisted content writing with brand voice training, (3) Visual content generation workflow, (4) Scheduling and distribution automation, (5) AI-powered community management (response drafting, sentiment triage), (6) Performance analytics and AI-generated insights, (7) Human review gates at each stage, (8) Quality control rubric, (9) Tool stack recommendation, (10) Team workflow integration." },
      { title: "Platform Launch Strategy", useCase: "New Platform Entry", level: "advanced", prompt: "Build a launch strategy for [BRAND] entering [NEW PLATFORM: TikTok/LinkedIn/Pinterest/Threads/YouTube] from zero. Cover: (1) Platform opportunity analysis (audience fit, content format advantages, competition level), (2) Channel positioning (unique angle on this platform), (3) First 30 days content plan (volume, types, testing approach), (4) Algorithm gaming tactics for new accounts, (5) Cross-platform leverage (how existing audience jumpstarts this channel), (6) Creator/collaboration strategy, (7) 90-day growth targets (followers, engagement rate, reach), (8) Investment required (time, budget, tools)." }
    ]
  },

  /* ============================================================
     FINANCE
     ============================================================ */
  "Finance": {
    free: [
      { title: "Financial Model Assumptions", useCase: "Financial Modeling", prompt: "Build the key assumptions section for a financial model for a [BUSINESS TYPE: e.g., SaaS startup / e-commerce / service business]. For each assumption: the variable, your base case estimate, the range (low/high), the data source or rationale, and how sensitive the model is to changes in this variable. Categories: Revenue drivers, Cost drivers, Working capital, Growth rates, Churn/retention." },
      { title: "Startup Financial Projections", useCase: "Fundraising", prompt: "Create a 3-year financial projection summary for [STARTUP NAME], a [BUSINESS MODEL] targeting [MARKET]. Year 1: early traction (conservative). Year 2: growth phase. Year 3: scale. Include: ARR/revenue, gross margin, headcount, burn rate, and path to profitability. Show key assumptions clearly. Format suitable for an investor deck." },
      { title: "Budget Template Design", useCase: "Business Finance", prompt: "Design a monthly budget template for a [COMPANY TYPE/DEPARTMENT]. Categories: Revenue (by stream), COGS (itemized), Gross Profit, Operating Expenses (breakdown: salaries, marketing, tools/software, rent, travel, other), EBITDA, and Net Income. Include: YTD actuals vs. budget columns, variance %, and a top 3 action items if variance is >10%." }
    ],
    premium: [
      { title: "Personal Budget Planner", useCase: "Personal Finance", level: "beginner", prompt: "Create a personal monthly budget for someone with [MONTHLY INCOME] living in [CITY/COUNTRY]. Categories: Housing (30% guideline), Food, Transportation, Health, Entertainment, Savings (20% rule), Debt Repayment, Miscellaneous. Show dollar amounts for each category, flag areas of overspending based on [THEIR ACTUAL SPENDING: PASTE], and give 3 actionable tips to increase savings by [X%]." },
      { title: "Invoice Template", useCase: "Freelance Finance", level: "beginner", prompt: "Create a professional freelance invoice template for a [PROFESSION: e.g., freelance designer / consultant / developer]. Include: invoice number, date, due date (net 30), client details, itemized services with quantity and rate, subtotal, tax line, total due, payment methods accepted, late payment policy, and a brief thank-you note. Provide in both formal and friendly tone versions." },
      { title: "Break-Even Analysis", useCase: "Business Planning", level: "beginner", prompt: "Calculate the break-even analysis for [BUSINESS/PRODUCT]. Fixed costs: [LIST FIXED COSTS/MONTH]. Variable cost per unit: [AMOUNT]. Selling price per unit: [AMOUNT]. Output: (1) Break-even units per month, (2) Break-even revenue, (3) Contribution margin per unit, (4) Margin of safety if current sales are [X UNITS/MONTH], (5) How break-even changes if price increases by 10% or fixed costs decrease by 15%." },
      { title: "Cash Flow Forecast", useCase: "Cash Management", level: "beginner", prompt: "Build a 13-week cash flow forecast for [BUSINESS]. Starting cash: [AMOUNT]. Expected weekly inflows: [DESCRIBE]. Expected weekly outflows: [LIST KEY EXPENSES]. Output: week-by-week cash balance, minimum cash balance week, and alert if cash drops below [THRESHOLD]. Include: 3 scenarios (base, optimistic, conservative) and a recommendation for the minimum cash reserve to maintain." },
      { title: "ROI Calculator Template", useCase: "Investment Analysis", level: "beginner", prompt: "Build an ROI calculation template for [TYPE OF INVESTMENT: e.g., marketing campaign / new hire / software tool / equipment]. Inputs: (1) Total investment cost (one-time + ongoing), (2) Expected revenue increase or cost saving, (3) Timeframe. Outputs: Simple ROI %, Payback period, NPV (with [DISCOUNT RATE]%), and a sensitivity table showing ROI at 50%/75%/100%/125% of expected returns." },
      { title: "Financial Ratio Analysis", useCase: "Financial Analysis", level: "beginner", prompt: "Calculate and interpret the key financial ratios for [COMPANY] using this data: [PASTE OR DESCRIBE P&L AND BALANCE SHEET]. Ratios: Liquidity (current, quick), Profitability (gross margin, net margin, ROE, ROA), Efficiency (inventory turnover, DSO, DPO), Leverage (debt-to-equity, interest coverage). For each ratio: the calculation, the result, industry benchmark comparison, and a 1-sentence interpretation." },
      { title: "Expense Reduction Audit", useCase: "Cost Optimization", level: "beginner", prompt: "Audit the following expense list for a [BUSINESS TYPE] and identify cost reduction opportunities: [PASTE EXPENSE LIST]. For each expense: (1) Is it essential/nice-to-have/can be eliminated?, (2) Negotiation potential (yes/no), (3) Cheaper alternative exists?, (4) Consolidation opportunity?. Output: a prioritized list of cuts that could save [TARGET AMOUNT/MONTH] with minimal impact on operations." },
      { title: "Pricing Strategy Options", useCase: "Pricing", level: "beginner", prompt: "Analyze 5 pricing strategy options for [PRODUCT/SERVICE] with a current cost of [COST/UNIT]. Strategies: (1) Cost-plus, (2) Value-based, (3) Competitive, (4) Penetration, (5) Freemium-to-paid. For each: calculate the price point, pros and cons, ideal market condition, and revenue projection at [TARGET SALES VOLUME]. Recommend the best strategy for [COMPANY'S CURRENT STAGE AND GOAL]." },
      { title: "Investor Update Template", useCase: "Startup Finance", level: "beginner", prompt: "Write a monthly investor update template for an early-stage startup. Sections: (1) One-sentence highlight, (2) Key metrics (MRR/ARR, growth rate, burn rate, runway, customers), (3) Progress vs. last month's goals, (4) Next month's goals, (5) Top challenge and how you're addressing it, (6) The Ask (introductions needed, advice on specific question). Keep it under 400 words. Honest, confident, transparent tone." },
      { title: "SaaS Unit Economics", useCase: "SaaS Finance", level: "intermediate", prompt: "Calculate and analyze the unit economics for a SaaS business with these metrics: [PASTE OR DESCRIBE: MRR, new customers/month, churn rate, CAC, ACV, gross margin]. Calculate: LTV, LTV:CAC ratio, CAC payback period, gross margin per customer, and net revenue retention. Interpret results vs. healthy SaaS benchmarks, identify the biggest unit economics lever to improve, and provide a 3-action improvement plan." },
      { title: "M&A Financial Due Diligence Checklist", useCase: "M&A Finance", level: "intermediate", prompt: "Create a financial due diligence checklist for acquiring [COMPANY TYPE]. Categories: (1) Revenue quality (concentration, recurring vs. one-time, contracts), (2) P&L analysis (normalization, hidden costs, EBITDA quality), (3) Balance sheet review (assets, liabilities, working capital), (4) Cash flow analysis, (5) Tax exposure, (6) Off-balance sheet items, (7) Key financial contracts and obligations, (8) Accounting policies and audit history, (9) Customer and supplier financial dependencies." },
      { title: "Fundraising Financial Package", useCase: "Startup Fundraising", level: "intermediate", prompt: "Build the financial package for a [SERIES SEED/A/B] fundraise for [STARTUP]. Deliverables: (1) 3-year financial model (P&L, cash flow, balance sheet), (2) Use of funds breakdown (where the raise goes), (3) Key metrics summary slide, (4) Unit economics teardown, (5) Scenario analysis (conservative/base/optimistic), (6) Cap table summary pre/post raise, (7) Key milestones this funding enables. Format for investor data room." },
      { title: "Crypto/DeFi Financial Analysis", useCase: "Web3 Finance", level: "intermediate", prompt: "Analyze the financial model for [DEFI PROTOCOL / CRYPTO PROJECT]. Cover: (1) Token economics (supply, distribution, vesting, inflation), (2) Revenue model (fees, protocol revenue, treasury), (3) Token price scenarios and market cap analysis, (4) Treasury management and runway, (5) Staking/yield sustainability analysis, (6) Competitive positioning vs. similar protocols, (7) Key risks (smart contract, regulatory, liquidity, whale concentration). Format as an investment research brief." },
      { title: "Financial Dashboard Design", useCase: "Finance Operations", level: "intermediate", prompt: "Design a real-time financial dashboard for [COMPANY TYPE]. Metrics to display: (1) Revenue (today/MTD/YTD vs. target), (2) Gross margin %, (3) Operating expenses vs. budget, (4) Cash balance and runway, (5) AR/AP aging, (6) Top 5 expense categories, (7) MoM growth rate. Data sources: [LIST SYSTEMS]. Refresh frequency. Alert thresholds. Audience: CFO and leadership team." },
      { title: "Pricing Sensitivity Model", useCase: "Revenue Optimization", level: "intermediate", prompt: "Build a pricing sensitivity analysis for [PRODUCT] at a current price of [CURRENT PRICE] with [X] customers and [MONTHLY REVENUE]. Model price changes from [LOW] to [HIGH] in [X] increments. For each price point: show expected customer churn % at that price increase, projected revenue impact, and net effect on MRR/ARR. Identify the price that maximizes revenue given the churn curve. Include elasticity assumptions." },
      { title: "Working Capital Optimization", useCase: "Cash Flow Management", level: "intermediate", prompt: "Design a working capital optimization strategy for [COMPANY] with current metrics: [DESCRIBE AR, AP, INVENTORY METRICS]. Analyze: (1) Days Sales Outstanding (DSO) reduction opportunities, (2) Days Payable Outstanding (DPO) extension potential, (3) Inventory Days reduction (if applicable), (4) Cash conversion cycle improvement. For each lever: current state, target state, specific action, and projected cash release. Prioritize by impact and implementation difficulty." },
      { title: "Portfolio Risk Analysis", useCase: "Investment Management", level: "intermediate", prompt: "Analyze the risk profile of this investment portfolio: [DESCRIBE HOLDINGS: asset classes, weights]. Cover: (1) Portfolio concentration risk, (2) Correlation analysis between holdings, (3) Drawdown potential in 3 scenarios (mild/moderate/severe market stress), (4) Risk-adjusted return metrics (Sharpe ratio, Sortino), (5) Rebalancing recommendation, (6) Suggested additions/removals to improve diversification. Benchmark: [BENCHMARK INDEX]." },
      { title: "Revenue Forecasting Model", useCase: "Revenue Planning", level: "intermediate", prompt: "Build a bottom-up revenue forecast for [COMPANY] for the next 12 months. For each revenue stream: [LIST STREAMS]. Forecast methodology: (1) Input metrics (pipeline, conversion rates, ACV, churn), (2) Monthly model with seasonality adjustments, (3) Assumptions table with sensitivity, (4) Three scenarios (base/bull/bear), (5) Revenue recognition policy notes. Output: monthly and quarterly revenue by stream, total ARR bridge, and YoY growth %." },
      { title: "CFO Strategic Finance Plan", useCase: "Finance Leadership", level: "advanced", prompt: "Develop a 12-month strategic finance plan for a newly appointed CFO at [COMPANY STAGE/TYPE]. Cover: (1) 30-60-90 day priorities, (2) Financial systems and data infrastructure audit and roadmap, (3) Planning and forecasting process design (FP&A operating model), (4) KPI framework and financial dashboard, (5) Capital allocation framework, (6) Investor relations and reporting, (7) Treasury and cash management strategy, (8) Tax strategy, (9) Risk management framework, (10) Finance team structure and capability build." },
      { title: "Valuation Analysis Framework", useCase: "Company Valuation", level: "advanced", prompt: "Build a comprehensive valuation analysis for [COMPANY] using multiple methodologies: (1) DCF (Discounted Cash Flow) — key assumptions, WACC calculation, terminal value approach, (2) Comparable company analysis (EV/Revenue, EV/EBITDA multiples — select 10 comps with rationale), (3) Precedent transaction analysis (recent M&A comps in [INDUSTRY]), (4) VC method (for early stage), (5) Sum of the parts (if applicable). Reconcile methods into a valuation range. Identify the most sensitive assumptions." },
      { title: "Zero-Based Budgeting Implementation", useCase: "Cost Management", level: "advanced", prompt: "Design a zero-based budgeting (ZBB) implementation for [COMPANY/DEPARTMENT]. Cover: (1) ZBB philosophy and how it differs from traditional budgeting, (2) Decision unit identification (how to break the org into budgeting units), (3) Decision package design (what each unit must justify), (4) Ranking methodology, (5) Timeline and process (kickoff, package submission, ranking sessions, approval), (6) Systems requirements, (7) Change management and CFO communication, (8) First-year savings target and tracking, (9) How to maintain ZBB culture year-over-year." },
      { title: "Financial Transformation Roadmap", useCase: "Finance Transformation", level: "advanced", prompt: "Design a finance transformation roadmap for [COMPANY] to evolve from [CURRENT STATE: e.g., manual, backward-looking] to [FUTURE STATE: e.g., automated, real-time, business partner model]. Cover: (1) Current state pain points (by finance function), (2) Target operating model, (3) Technology roadmap (ERP, FP&A tool, BI, automation), (4) Process redesign priorities, (5) Data and analytics capability build, (6) Finance business partnering model, (7) Team capability and upskilling plan, (8) Implementation waves with business case, (9) Change management plan." }
    ]
  },

  /* ============================================================
     AI INFRASTRUCTURE
     ============================================================ */
  "AI Infrastructure": {
    free: [
      { title: "LLM Evaluation Framework", useCase: "AI Model Selection", prompt: "Design an evaluation framework for selecting an LLM for [USE CASE]. Define: (1) 5 test task categories relevant to the use case, (2) 10 test prompts per category (sample 3 here), (3) Evaluation rubric (accuracy, latency, cost, safety, format adherence), (4) Scoring methodology, (5) Models to evaluate: [LIST], (6) Pass/fail threshold criteria, (7) How to make the final selection decision. Consider: context window needs, fine-tuning requirements, pricing, and API reliability." },
      { title: "AI Prompt Engineering System", useCase: "Prompt Engineering", prompt: "Build a systematic prompt engineering approach for [USE CASE / APPLICATION]. Define: (1) System prompt structure (role, context, constraints, output format), (2) User prompt template with required inputs, (3) Chain-of-thought or reasoning instructions, (4) Output format specification (JSON schema / markdown / plain text), (5) Error handling instructions, (6) 3 few-shot examples, (7) Quality criteria for output evaluation, (8) Version control and A/B testing approach for prompt improvements." },
      { title: "RAG System Design", useCase: "Retrieval-Augmented Generation", prompt: "Design a RAG (Retrieval-Augmented Generation) system for [USE CASE: e.g., internal knowledge base / customer support / document QA]. Specify: (1) Document ingestion pipeline (formats, chunking strategy, overlap), (2) Embedding model selection, (3) Vector database choice (Pinecone/Weaviate/Chroma — justify), (4) Retrieval strategy (similarity search, hybrid search, reranking), (5) Context injection into LLM prompt, (6) Citation and source attribution, (7) Evaluation metrics (retrieval recall, answer faithfulness, relevance), (8) Scaling approach." }
    ],
    premium: [
      { title: "AI Use Case Prioritization", useCase: "AI Strategy", level: "beginner", prompt: "Identify and prioritize AI use cases for [COMPANY/DEPARTMENT]. For each of 10 proposed use cases: (1) Description, (2) Business value (revenue impact / cost saving / risk reduction), (3) Technical feasibility (data availability, model complexity, integration), (4) Time to value, (5) Risk level. Score each on a 1–5 scale per dimension. Output: prioritized backlog of AI use cases with a recommended pilot selection." },
      { title: "AI Tool Evaluation Matrix", useCase: "Vendor Selection", level: "beginner", prompt: "Build an evaluation matrix for selecting an AI tool for [USE CASE]. Evaluation criteria: (1) Core capability fit, (2) Ease of integration, (3) Security and compliance, (4) Pricing model and TCO, (5) Vendor maturity and roadmap, (6) Support quality, (7) User experience. Tools to evaluate: [LIST 3–5]. Weight each criterion by importance. Score each tool and produce a recommendation with rationale." },
      { title: "AI Ethics Checklist", useCase: "Responsible AI", level: "beginner", prompt: "Create an AI ethics checklist for reviewing [AI APPLICATION] before deployment. Categories: (1) Bias and fairness (protected attributes, training data representation, output disparity testing), (2) Transparency (explainability requirements, disclosure to users), (3) Privacy (data used, consent, retention), (4) Safety (harm potential, failure modes), (5) Accountability (who is responsible for decisions), (6) Environmental impact. Flag / pass / needs review for each item." },
      { title: "Fine-Tuning Data Preparation Guide", useCase: "Model Fine-Tuning", level: "beginner", prompt: "Write a data preparation guide for fine-tuning [MODEL TYPE: GPT/Llama/Mistral] for [USE CASE]. Cover: (1) Data format requirements (JSONL, prompt-completion pairs), (2) Minimum dataset size recommendation, (3) Data quality standards (accuracy, diversity, format consistency), (4) Data collection strategy, (5) Annotation guidelines, (6) Data splitting (train/validation/test), (7) Personally identifiable information (PII) scrubbing process, (8) Sample data examples (3–5), (9) Evaluation plan post fine-tuning." },
      { title: "AI Governance Policy", useCase: "AI Policy", level: "beginner", prompt: "Write an AI governance policy for [ORGANIZATION]. Cover: (1) Approved and prohibited AI use cases, (2) Data input restrictions (what must never be entered into AI tools), (3) Output review requirements by use case risk level, (4) Vendor approval process for new AI tools, (5) Intellectual property and copyright guidelines, (6) Confidentiality requirements, (7) Mandatory disclosures when AI is used, (8) Training requirements for employees, (9) Incident reporting process, (10) Policy review and update schedule." },
      { title: "Vector Database Architecture", useCase: "AI Infrastructure", level: "beginner", prompt: "Design a vector database architecture for [APPLICATION: e.g., semantic search / recommendation engine / RAG system]. Cover: (1) Embedding model selection and dimensionality, (2) Vector database platform comparison (Pinecone/Weaviate/Chroma/Milvus/PgVector — recommend one with rationale), (3) Index type selection (HNSW/IVF/FLAT), (4) Metadata storage and filtering strategy, (5) Namespace/collection design, (6) Upsert and delete operations, (7) Query performance targets, (8) Scaling approach for [X MILLION VECTORS], (9) Cost estimation." },
      { title: "LLM Cost Optimization Guide", useCase: "AI Cost Management", level: "beginner", prompt: "Write a cost optimization guide for LLM API usage for [APPLICATION]. Cover: (1) Token usage audit (input vs. output token ratio), (2) Model right-sizing (when to use GPT-4o vs. GPT-4o-mini vs. smaller models), (3) Caching strategy (exact match + semantic caching), (4) Prompt compression techniques, (5) Batching opportunities, (6) Context window management, (7) Streaming vs. non-streaming trade-offs, (8) Monitoring and alerting for cost anomalies, (9) Monthly cost projection and budget controls." },
      { title: "AI Observability Setup", useCase: "MLOps", level: "beginner", prompt: "Design an AI observability setup for a [LLM APPLICATION / ML MODEL in production]. Cover: (1) Metrics to track (latency P50/P95/P99, token usage, error rate, cost per request), (2) LLM-specific quality metrics (hallucination rate, answer relevance, faithfulness), (3) Logging strategy (what to log, retention policy), (4) Tracing for multi-step AI pipelines, (5) Alerting rules and thresholds, (6) Dashboard design, (7) Tool recommendation (LangSmith/Helicone/Arize/Datadog)." },
      { title: "AI Security Threat Model", useCase: "AI Security", level: "beginner", prompt: "Build a threat model for an AI application: [DESCRIBE APPLICATION]. Identify threats by category: (1) Prompt injection attacks, (2) Jailbreaking and guardrail bypass, (3) Data exfiltration through LLM, (4) Model inversion / memorization attacks, (5) Supply chain attacks (model or data), (6) Adversarial inputs for ML models, (7) API key theft and abuse. For each threat: attack vector, likelihood, potential impact, and mitigation controls." },
      { title: "MLOps Pipeline Design", useCase: "MLOps", level: "intermediate", prompt: "Design an MLOps pipeline for [ML USE CASE] at [COMPANY]. Cover: (1) Data versioning and lineage, (2) Feature store design, (3) Training pipeline (orchestration, compute, hyperparameter tuning), (4) Model registry and versioning, (5) CI/CD for models (automated testing gates), (6) Deployment strategies (shadow/canary/blue-green), (7) Model serving architecture (latency SLA, autoscaling), (8) Monitoring (data drift, model drift, performance degradation), (9) Retraining triggers and automation, (10) Tool stack recommendation." },
      { title: "AI Agent Architecture", useCase: "AI Agents", level: "intermediate", prompt: "Architect an AI agent system for [USE CASE]. Define: (1) Agent type (ReAct/Plan-and-Execute/Reflexion — justify), (2) LLM backbone and why, (3) Tool library (list each tool, its API schema, when agent uses it), (4) Memory design (conversation buffer, vector memory, episodic memory), (5) Planning and task decomposition approach, (6) Stopping criteria and loop prevention, (7) Error handling and retry logic, (8) Safety constraints and output validation, (9) Evaluation framework (task completion rate, efficiency), (10) Human oversight integration." },
      { title: "Enterprise AI Deployment Checklist", useCase: "AI Deployment", level: "intermediate", prompt: "Create an enterprise AI deployment checklist for [AI APPLICATION] going into production. Categories: (1) Security review (OWASP LLM Top 10 checks, data handling), (2) Privacy and compliance (GDPR/CCPA/HIPAA if applicable), (3) Bias and fairness testing, (4) Performance testing (load, latency, accuracy benchmarks), (5) Integration testing, (6) Rollback plan, (7) User acceptance testing, (8) Documentation (user guide, API docs, runbook), (9) Monitoring and alerting setup, (10) Incident response plan, (11) User training, (12) Legal and IP review." },
      { title: "LLM Fine-Tuning Strategy", useCase: "Model Customization", level: "intermediate", prompt: "Develop a fine-tuning strategy for [BASE MODEL] to specialize in [TASK/DOMAIN]. Cover: (1) Fine-tuning vs. RAG vs. prompt engineering decision framework for this use case, (2) Dataset requirements (size, quality, format, collection strategy), (3) Training approach (full fine-tuning/LoRA/QLoRA — justify), (4) Hyperparameter selection, (5) Evaluation dataset design and metrics, (6) Catastrophic forgetting mitigation, (7) Safety alignment preservation, (8) Infrastructure requirements, (9) Cost estimation, (10) Deployment and versioning plan." },
      { title: "AI Platform Vendor Evaluation", useCase: "AI Strategy", level: "intermediate", prompt: "Design a vendor evaluation framework for selecting an AI platform for [ENTERPRISE USE CASE]. Evaluate: (1) Foundation model access (quality, diversity, update cadence), (2) Fine-tuning and customization capabilities, (3) Deployment options (cloud/on-premise/VPC), (4) Enterprise security (SOC 2, data isolation, encryption), (5) Compliance certifications, (6) Pricing model and cost predictability, (7) Support and SLAs, (8) Developer experience and APIs, (9) Roadmap alignment, (10) Reference customers in [INDUSTRY]. Score and weight criteria for the final decision." },
      { title: "Conversational AI Design System", useCase: "Conversational AI", level: "intermediate", prompt: "Design a production conversational AI system for [USE CASE]. Architecture: (1) Intent recognition layer, (2) Entity extraction design, (3) Dialogue state management, (4) Response generation (retrieval vs. generative vs. hybrid), (5) Context window management across turns, (6) Fallback and escalation logic, (7) Multi-language support approach, (8) A/B testing framework for conversation design, (9) Conversation analytics and quality monitoring, (10) Continuous improvement loop from conversation data." },
      { title: "AI Data Strategy", useCase: "Data for AI", level: "intermediate", prompt: "Develop an AI data strategy for [COMPANY] to build a competitive AI advantage through proprietary data. Cover: (1) Data asset inventory (what proprietary data exists and its AI value), (2) Data collection acceleration (how to capture more high-value data through product), (3) Data labeling and annotation program, (4) Synthetic data generation opportunities, (5) Data partnerships and licensing, (6) Data flywheel design, (7) Privacy-preserving ML techniques (federated learning, differential privacy), (8) Data governance for AI, (9) Build vs. buy vs. collaborate decision for each data type." },
      { title: "AI Infrastructure Cost Model", useCase: "AI FinOps", level: "intermediate", prompt: "Build an AI infrastructure cost model for [COMPANY] running [AI APPLICATIONS]. Components: (1) Training compute costs (GPU/TPU hours × rate), (2) Inference costs (per-request API costs or self-hosted GPU costs), (3) Vector database and storage, (4) Data pipeline and processing, (5) Monitoring and observability tools, (6) Human review / RLHF labeling costs. Build: current cost baseline, cost per user/request/output, and projections at [10x/100x] scale. Identify the top 3 cost reduction levers." },
      { title: "AI Product Roadmap", useCase: "AI Product", level: "intermediate", prompt: "Build an AI product roadmap for [PRODUCT/COMPANY] over 18 months. Framework: (1) Current AI capabilities inventory, (2) User problems AI can uniquely solve, (3) AI features backlog (20 ideas), (4) Prioritization (impact × feasibility × strategic alignment scoring), (5) Roadmap phases (Now/Next/Later), (6) Technical dependencies and pre-requisites, (7) Data requirements per feature, (8) Responsible AI review gates, (9) Success metrics per feature, (10) Competitive intelligence — what AI features must be matched vs. where to differentiate." },
      { title: "Responsible AI Framework", useCase: "AI Ethics", level: "advanced", prompt: "Design a comprehensive responsible AI framework for [ORGANIZATION]. Cover: (1) AI ethics principles (define 5–7 and what they mean in practice), (2) AI risk taxonomy (by harm type, likelihood, severity), (3) Pre-deployment impact assessment process, (4) Algorithmic bias testing requirements by model type, (5) Ongoing monitoring for fairness drift, (6) Explainability requirements by decision criticality, (7) Human oversight requirements, (8) Affected community engagement process, (9) Incident response for AI harms, (10) Governance structure (ethics board, review process), (11) External audit approach." },
      { title: "Foundation Model Strategy", useCase: "Enterprise AI Strategy", level: "advanced", prompt: "Develop a foundation model strategy for [ENTERPRISE] deciding between: build / fine-tune / use API / open-source self-host. Analyze: (1) Use case portfolio and model requirements, (2) Build analysis (data requirements, compute budget, team capability, time-to-value), (3) Fine-tuning analysis (for which use cases, which base models, expected improvement), (4) API usage analysis (GPT-4o/Claude/Gemini comparison for each use case), (5) Open-source self-host analysis (Llama/Mistral — cost vs. control), (6) Hybrid architecture recommendation, (7) Vendor lock-in risk mitigation, (8) 3-year cost comparison model." },
      { title: "AI Transformation Program Design", useCase: "Enterprise AI Transformation", level: "advanced", prompt: "Design an enterprise AI transformation program for [COMPANY] with [X EMPLOYEES] across [X DEPARTMENTS]. Cover: (1) AI maturity assessment, (2) Transformation vision and success definition, (3) Use case identification and roadmap (by department, by maturity stage), (4) Data and infrastructure readiness plan, (5) AI center of excellence design, (6) Talent strategy (hire / upskill / partner), (7) Governance and responsible AI framework, (8) Change management and culture, (9) Investment model and ROI framework, (10) 3-year program plan with phase gates." },
      { title: "AI System Reliability Engineering", useCase: "AI SRE", level: "advanced", prompt: "Design an SRE (Site Reliability Engineering) framework for AI systems at [COMPANY]. Cover: (1) SLOs specific to AI (accuracy SLO, latency SLO, freshness SLO), (2) Error budget policy for AI failures vs. traditional system failures, (3) Toil identification in AI operations, (4) Chaos engineering for AI systems, (5) On-call runbooks for AI-specific incidents (model degradation, hallucination surge, latency spike), (6) Post-mortem template for AI incidents, (7) Capacity planning for GPU/inference infrastructure, (8) Multi-region resilience for AI services." }
    ]
  },

  /* ============================================================
     E-COMMERCE
     ============================================================ */
  "E-commerce": {
    free: [
      { title: "Product Launch Copy", useCase: "Product Marketing", prompt: "Write the full launch copy package for [PRODUCT NAME] in [PRODUCT CATEGORY]. Deliver: (1) Product name and tagline, (2) Hero headline for the product page, (3) 3-paragraph product description (problem → solution → transformation), (4) 5 feature-benefit bullet points, (5) 3 social proof snippets (customer quote templates), (6) Urgency/scarcity element, (7) FAQ section (5 Q&As), (8) Email subject line for launch day. Target buyer: [BUYER PERSONA]." },
      { title: "Cart Abandonment Email", useCase: "Recovery Marketing", prompt: "Write a 3-email cart abandonment recovery sequence for [E-COMMERCE STORE]. Email 1 (1 hour after abandonment): gentle reminder, show cart contents, no discount. Email 2 (24 hours): address common objections, add social proof. Email 3 (72 hours): final attempt with a [X%] discount or free shipping offer. Each email: compelling subject line, personalized opener, clear CTA button text, and mobile-optimized structure." },
      { title: "Product Category SEO Page", useCase: "E-commerce SEO", prompt: "Write an SEO-optimized category page for [PRODUCT CATEGORY] on [STORE NAME]. Include: (1) H1 with primary keyword, (2) 150-word category description (informative, keyword-rich, not spammy), (3) Buying guide section (what to look for when buying [CATEGORY] — 3 tips), (4) FAQ section (3 questions targeting long-tail keywords), (5) Internal linking suggestions. Primary keyword: [KEYWORD]. Secondary keywords: [LIST 3–5]." }
    ],
    premium: [
      { title: "Store Conversion Audit", useCase: "CRO", level: "beginner", prompt: "Audit [E-COMMERCE STORE] for conversion rate optimization. Check: (1) Homepage — value prop clarity, trust signals, navigation, (2) Product page — images, description, price, reviews, CTA, (3) Cart page — friction, trust badges, upsells, (4) Checkout — form fields, guest checkout, payment options, (5) Mobile experience. For each issue found: severity (high/medium/low), specific recommendation, and estimated conversion lift." },
      { title: "Email Welcome Series", useCase: "Email Marketing", level: "beginner", prompt: "Write a 5-email welcome series for new subscribers to [E-COMMERCE BRAND] who haven't purchased yet. Email 1: Brand story + 10% welcome offer. Email 2: Bestsellers showcase. Email 3: Social proof + customer stories. Email 4: Value content (how to [USE PRODUCT CATEGORY]). Email 5: Urgency — offer expiring soon. Each: subject line, preview text, 150-word body, CTA. Voice: [BRAND VOICE]." },
      { title: "Product Bundle Strategy", useCase: "Revenue Optimization", level: "beginner", prompt: "Design a product bundling strategy for [E-COMMERCE STORE] with these top products: [LIST 10 PRODUCTS WITH PRICES]. Create: (1) 5 bundle combinations (complementary products), (2) Bundle pricing (use anchoring), (3) Bundle naming, (4) Bundle description copy, (5) Where to display bundles on the site, (6) A/B test plan for bundle vs. individual product pages. Goal: increase AOV by [X%]." },
      { title: "Loyalty Program Design", useCase: "Retention", level: "beginner", prompt: "Design a customer loyalty program for [E-COMMERCE BRAND]. Include: (1) Program name and concept, (2) Points earning structure (points per dollar, bonus actions: review, referral, birthday), (3) Tier system (3 tiers with names and benefits), (4) Points redemption options, (5) Enrollment flow, (6) Email communication series for the program, (7) Expected impact on repeat purchase rate and LTV. Platform recommendation: [SMILE.IO/YOTPO/LOYALTY LION]." },
      { title: "Supplier Sourcing Brief", useCase: "Operations", level: "beginner", prompt: "Write a product sourcing brief for finding a supplier for [PRODUCT TYPE] to sell on [PLATFORM/STORE]. Include: (1) Product specifications (materials, dimensions, quality standards), (2) Target price range and MOQ, (3) Certification requirements (CE, FDA, etc.), (4) Lead time requirements, (5) Packaging requirements, (6) Questions to ask potential suppliers, (7) How to vet suppliers (Alibaba/trade shows/sourcing agents), (8) Sample evaluation criteria." },
      { title: "Amazon Listing Optimization", useCase: "Amazon SEO", level: "beginner", prompt: "Optimize this Amazon product listing for [PRODUCT NAME]. Current listing: [PASTE CURRENT LISTING]. Provide: (1) Optimized title (under 200 chars, keyword-rich, benefit-led), (2) 5 bullet points (each starting with a benefit, under 200 chars, keyword-integrated), (3) Product description in Amazon A+ format, (4) Backend keywords (250 chars), (5) 5 primary keywords to target, (6) Image recommendations (what shots to add), (7) Q&A seeding (5 questions + answers to plant)." },
      { title: "Product Returns Policy", useCase: "Customer Experience", level: "beginner", prompt: "Write a customer-friendly returns and refund policy for [E-COMMERCE STORE] in [PRODUCT CATEGORY]. Cover: return window (days), condition requirements, return process (step-by-step), refund timeline, exchange options, defective item handling, and international order policy. Balance: legally protecting the business while maximizing customer confidence. Write in plain, reassuring language. Length: under 400 words." },
      { title: "Influencer Gifting Campaign", useCase: "Influencer Marketing", level: "beginner", prompt: "Design an influencer gifting campaign for [BRAND] launching [PRODUCT]. Plan: (1) Target influencer profile (niche, size, platform), (2) How to find and vet them, (3) Outreach message template, (4) Gifting package (product + personal touch + campaign brief), (5) Content guidelines (what to ask for without being controlling), (6) Follow-up and relationship building, (7) How to measure ROI (UGC collected, reach, promo code usage, referral traffic)." },
      { title: "Seasonal Sale Campaign", useCase: "Promotions", level: "beginner", prompt: "Plan a [HOLIDAY: e.g., Black Friday / Summer Sale / Back to School] campaign for [E-COMMERCE STORE]. Deliver: (1) Campaign concept and name, (2) Discount structure (which products, what depth), (3) Timeline (pre-sale buildup, sale period, post-sale), (4) Email sequence (5 emails: teaser, early access, launch, reminder, last chance), (5) SMS campaign (2 messages), (6) Social media content plan (5 posts), (7) Paid ads targeting strategy, (8) Revenue target and required conversion rate." },
      { title: "Omnichannel Retail Strategy", useCase: "Retail Strategy", level: "intermediate", prompt: "Design an omnichannel retail strategy for [BRAND] selling across [CHANNELS: D2C website / Amazon / retail stores / social commerce]. Cover: (1) Channel role definition (what each channel does best), (2) Inventory allocation and fulfillment strategy, (3) Pricing consistency policy, (4) Customer data unification approach, (5) Consistent brand experience across touchpoints, (6) Cross-channel journey mapping, (7) Attribution modeling for omnichannel, (8) Technology stack (OMS, PIM, CDP), (9) Channel P&L structure." },
      { title: "D2C Brand Launch Playbook", useCase: "Brand Launch", level: "intermediate", prompt: "Write a D2C brand launch playbook for [BRAND NAME] in [PRODUCT CATEGORY]. Phases: (1) Pre-launch (8 weeks): audience building, supplier finalization, marketing assets, press seeding, (2) Launch week: campaign execution, influencer activation, PR push, paid ads launch, (3) Post-launch (30 days): retention, UGC collection, review generation, performance optimization. For each phase: specific tasks, owners, tools, and success metrics." },
      { title: "Subscription Commerce Model", useCase: "Subscription Business", level: "intermediate", prompt: "Design a subscription commerce model for [PRODUCT CATEGORY]. Cover: (1) Subscription tiers and pricing, (2) Subscribe & Save vs. curated box vs. replenishment model (choose best fit), (3) Subscriber acquisition strategy, (4) Unboxing and customer experience design, (5) Churn reduction tactics (pause, swap, skip options), (6) Subscriber LTV model, (7) Operations (inventory forecasting, fulfillment), (8) Subscriber communication cadence, (9) Subscriber win-back sequence." },
      { title: "Marketplace Expansion Strategy", useCase: "Multi-Channel Selling", level: "intermediate", prompt: "Develop a marketplace expansion strategy for [BRAND] expanding from [CURRENT CHANNEL] to new marketplaces: [LIST MARKETPLACES: Amazon/Walmart/Target/Etsy/TikTok Shop]. For each marketplace: fit assessment, listing optimization requirements, fulfillment options (FBM/FBA/fulfilled by marketplace), pricing strategy, advertising approach, and resource requirements. Prioritize marketplaces by expected ROI. Include a phased rollout plan." },
      { title: "Customer Winback Campaign", useCase: "Retention", level: "intermediate", prompt: "Design a customer winback campaign for [E-COMMERCE STORE] targeting customers who haven't purchased in [X DAYS]. Segmentation: [60 DAYS / 90 DAYS / 120+ DAYS]. For each segment: email sequence (3 emails), SMS touchpoint, offer strategy (escalating discount from 0% → 10% → 20%), subject lines, and predicted recovery rate. Include: suppression logic (exit if they purchase), and a sunset sequence for non-responders." },
      { title: "Product Photography Brief", useCase: "Visual Commerce", level: "intermediate", prompt: "Write a product photography brief for a shoot for [PRODUCT NAME] by [BRAND]. Images needed: (1) White background hero shots (3 angles), (2) Lifestyle shots in [SETTING] (5 images), (3) Detail/texture close-ups (3 images), (4) Scale reference shot, (5) Packaging shot, (6) 'In use' action shot. For each: props, models if needed, mood board direction, lighting style, composition notes. Final deliverables: format, resolution, file naming."  },
      { title: "International E-commerce Expansion", useCase: "Global Commerce", level: "intermediate", prompt: "Plan an international e-commerce expansion for [BRAND] targeting [COUNTRY/REGION]. Cover: (1) Market demand validation, (2) Regulatory requirements (product compliance, data privacy, consumer protection), (3) Localization needs (language, currency, payment methods, sizing), (4) Logistics and fulfillment options, (5) Duty and tax implications, (6) Customer support in local language, (7) Marketing channel adaptations, (8) Pricing strategy (account for duties, FX, local competition), (9) Launch timeline and investment required." },
      { title: "E-commerce Tech Stack Audit", useCase: "Tech Strategy", level: "intermediate", prompt: "Audit and recommend the e-commerce tech stack for [BRAND] at [SCALE: revenue, orders/day, SKU count]. Current stack: [LIST TOOLS]. Evaluate and recommend: (1) E-commerce platform (Shopify/BigCommerce/custom — justify), (2) Payment processing, (3) OMS (order management), (4) WMS (warehouse management), (5) CDP and email marketing, (6) Analytics and attribution, (7) Search and merchandising, (8) Customer service, (9) Reviews and UGC. For each: current gaps, recommended tool, integration complexity, and implementation priority." },
      { title: "Profitability Analysis by SKU", useCase: "Financial Analysis", level: "intermediate", prompt: "Build a profitability analysis framework for [E-COMMERCE STORE]'s product catalog. For each SKU: (1) Revenue (units sold × price), (2) COGS (product cost + packaging + duties), (3) Fulfillment cost (pick/pack/ship), (4) Return cost (return rate × cost), (5) Marketing cost allocation (CAC × blended attribution), (6) Gross margin and contribution margin. Identify: top 20% of SKUs by profitability, SKUs that lose money at scale, and discontinuation candidates." },
      { title: "Revenue Recovery Optimization", useCase: "Revenue Management", level: "intermediate", prompt: "Design a revenue recovery optimization system for [E-COMMERCE STORE] targeting [X% REVENUE RECOVERY RATE]. Levers to optimize: (1) Cart abandonment (email + SMS + retargeting), (2) Browse abandonment (email + on-site nudge), (3) Post-purchase upsell (on confirmation page + email), (4) Failed payment recovery sequence, (5) Coupon code misuse prevention, (6) Return-to-purchase conversion. For each lever: current recovery rate, target, specific tactics, tech tools, and estimated annual revenue impact." },
      { title: "Private Label Brand Strategy", useCase: "Brand Building", level: "advanced", prompt: "Develop a private label brand strategy for [RETAILER/ENTREPRENEUR] launching in [PRODUCT CATEGORY]. Cover: (1) Market gap analysis and product opportunity, (2) Brand positioning vs. national brands and other private labels, (3) Product development and sourcing strategy, (4) Branding and packaging design brief, (5) Pricing architecture, (6) Distribution strategy (own site / Amazon / retail), (7) Launch marketing plan, (8) IP protection (trademark, design patent), (9) Defensibility strategy — how to build a moat over 3 years, (10) Financial model (investment, margins, break-even)." },
      { title: "Headless Commerce Architecture", useCase: "E-commerce Technology", level: "advanced", prompt: "Architect a headless commerce solution for [BRAND] with [SCALE: X sessions/day, X SKUs, X markets]. Cover: (1) Business case for headless vs. traditional (when it's worth it), (2) Frontend framework selection (Next.js/Nuxt/Gatsby — justify), (3) Commerce engine (Shopify headless/BigCommerce/MACH architecture), (4) CMS integration, (5) API design (GraphQL/REST — justify), (6) Performance targets (Core Web Vitals, TTFB), (7) CDN and caching strategy, (8) Personalization layer, (9) Search integration, (10) Team capabilities required, (11) Migration plan from current platform." },
      { title: "E-commerce Brand Acquisition Analysis", useCase: "M&A / Investment", level: "advanced", prompt: "Conduct an acquisition analysis for buying e-commerce brand [BRAND NAME] currently generating [REVENUE] with [PROFIT MARGINS]. Analyze: (1) Business quality (traffic sources, customer concentration, brand defensibility), (2) Revenue quality (repeat purchase rate, subscription %, channel mix risk), (3) Operations assessment (supply chain, margins, team), (4) Growth opportunities post-acquisition, (5) Risks (Amazon dependency, supplier concentration, trademark), (6) Valuation multiples (revenue and EBITDA), (7) Deal structure options, (8) 100-day post-acquisition value creation plan, (9) Exit strategy in [X YEARS]." }
    ]
  },


  /* ============================================================
     PRESENTATION
     ============================================================ */
  "Presentation": {
    free: [
      { title: "Investor Pitch Deck Story", useCase: "Fundraising", prompt: "Write the narrative story arc for a [SERIES SEED/A] investor pitch deck for [STARTUP NAME]. 10 slides: (1) Opening hook — the 'why now' moment, (2) Problem — make it visceral and data-backed, (3) Solution — simple and elegant, (4) Market size — TAM/SAM/SOM with a bottom-up story, (5) Product — show don't tell, (6) Business model — clear and defensible, (7) Traction — the hockey stick moment, (8) Team — why we're the ones to win, (9) The Ask — what we need and why, (10) Vision — the future we're building. Each slide: headline + 3 supporting points." },
      { title: "Sales Deck Narrative", useCase: "Sales Presentations", prompt: "Write the slide-by-slide narrative for a sales deck for [PRODUCT/SERVICE] targeting [BUYER]. Structure: (1) Opening relevance hook (their world, their pain), (2) Cost of the status quo (quantify the problem), (3) A different way — the vision, (4) Introducing [PRODUCT] — how it works in 3 steps, (5) Results (case study + metrics), (6) Why [COMPANY] (differentiation), (7) Packages and pricing, (8) Next steps. For each slide: headline (max 8 words), 3 key points, and speaker notes." },
      { title: "Conference Talk Structure", useCase: "Public Speaking", prompt: "Structure a [X]-minute conference talk on [TOPIC] for [AUDIENCE]. Create: a TED-talk-style opening (story or provocative question), thesis statement, 3 main sections (each with a key insight + evidence + story), one 'aha moment' where the audience sees something they couldn't unsee, practical takeaways (3 actions), and a memorable closing line. Include slide count guidance per section." }
    ],
    premium: [
      { title: "Executive Briefing Deck", useCase: "Leadership Communication", level: "beginner", prompt: "Create a 5-slide executive briefing deck on [TOPIC/DECISION] for [C-SUITE AUDIENCE]. Slide 1: Situation summary (what is happening). Slide 2: Why it matters (business impact). Slide 3: Options considered (2–3 options with pros/cons). Slide 4: Recommendation and rationale. Slide 5: Ask and next steps. Each slide: 1 headline + max 4 bullet points. Appendix: supporting data. Total speaking time: 10 minutes." },
      { title: "Workshop Facilitation Deck", useCase: "Facilitation", level: "beginner", prompt: "Design a [X]-hour workshop facilitation deck for [WORKSHOP TOPIC] with [X PARTICIPANTS]. Agenda slides: welcome and objectives, icebreaker activity, content section 1 (with exercise), content section 2 (with exercise), group sharing, synthesis and action planning, closing. For each section: facilitator notes, timing, materials needed, and expected output." },
      { title: "Annual Report Presentation", useCase: "Corporate Reporting", level: "beginner", prompt: "Write the narrative copy for an annual report presentation for [COMPANY NAME] for [YEAR]. Sections: CEO opening letter (300 words — vision and gratitude), Financial highlights (5 key metrics with year-on-year), Major accomplishments (3 milestones), Team and culture highlights, Community and CSR impact, Looking ahead (3 priorities for next year), Closing. Tone: proud, transparent, forward-looking." },
      { title: "Board Meeting Presentation", useCase: "Corporate Governance", level: "beginner", prompt: "Structure a board meeting presentation for [COMPANY] for [QUARTER]. Slides: (1) Business snapshot (key metrics vs. targets), (2) Q[X] highlights and achievements, (3) Q[X] challenges and learnings, (4) Competitive landscape update, (5) Financials (P&L, cash, runway), (6) People update (headcount, key hires, attrition), (7) Q[X+1] priorities, (8) Governance items for vote, (9) Ask from the board. Pre-read materials to send 48 hours in advance." },
      { title: "Training Presentation Design", useCase: "L&D", level: "beginner", prompt: "Design a [X]-slide training presentation on [TRAINING TOPIC] for [AUDIENCE]. Structure: learning objectives slide, agenda, content sections (one concept per slide), visual/diagram for each concept, interactive question slides (every 10 minutes), summary slide, knowledge check (5 questions), and resources/next steps. Include facilitator speaking notes for each slide. Keep text sparse — visuals lead, words support." },
      { title: "Demo / Webinar Slide Deck", useCase: "Product Marketing", level: "beginner", prompt: "Write the script and slide outline for a 45-minute product demo webinar for [PRODUCT] targeting [AUDIENCE]. Structure: welcome and housekeeping (5 min), problem framing (5 min), product demo (25 min — list 5 feature demonstrations), Q&A (8 min), close and offer (7 min). For each section: slide content, speaker script, and engagement prompt. Include a slide for the offer/CTA with pricing." },
      { title: "Keynote Opening Script", useCase: "Public Speaking", level: "beginner", prompt: "Write the opening 5 minutes of a keynote speech on [TOPIC] for [AUDIENCE] at [EVENT]. Start with a story, statistic, or provocation that instantly grabs attention. Build to the central thesis. Make the audience feel this talk will change something for them. Include: delivery notes (pause here, slow down here, make eye contact at this line), and transition into the first major section." },
      { title: "Nonprofit Pitch Presentation", useCase: "Nonprofit Fundraising", level: "beginner", prompt: "Create a 10-slide nonprofit pitch presentation for [ORGANIZATION NAME] seeking [GRANT AMOUNT/PARTNERSHIP] from [FUNDER/PARTNER]. Slides: (1) The problem — human impact story, (2) Scale of the problem, (3) Our solution, (4) How it works, (5) Proof — results to date, (6) The people — team and partners, (7) Financial model and sustainability, (8) The ask — specific and compelling, (9) Vision — the world we're building, (10) How to get involved / next steps." },
      { title: "Department QBR Presentation", useCase: "Business Reviews", level: "beginner", prompt: "Build a quarterly business review (QBR) presentation for the [DEPARTMENT] team presenting to [AUDIENCE]. Sections: (1) Quarter scorecard (OKRs: hit/miss), (2) Top 3 wins with business impact, (3) Top 2 misses with root cause and learning, (4) Key metrics trend (3–5 charts), (5) Headcount and resource update, (6) Next quarter priorities (3 OKRs), (7) Cross-functional dependencies, (8) Ask from leadership. Data-first, honest, forward-looking. 30 minutes speaking time." },
      { title: "McKinsey-Style Problem-Solving Deck", useCase: "Consulting", level: "intermediate", prompt: "Structure a McKinsey pyramid-principle presentation solving [BUSINESS PROBLEM] for [CLIENT/LEADERSHIP]. Format: (1) Situation — what is the context?, (2) Complication — what changed or what's the tension?, (3) Question — what are we trying to answer?, (4) Answer first — lead with the recommendation, (5) Supporting arguments (3 pillars, each with evidence), (6) Implications and next steps. Apply MECE thinking throughout. Each slide: one idea, one headline (the 'so what'), and data/logic that proves it." },
      { title: "Data Storytelling Presentation", useCase: "Data Communication", level: "intermediate", prompt: "Design a data storytelling presentation on [DATA TOPIC] for [NON-TECHNICAL AUDIENCE]. Transform these data insights: [PASTE KEY INSIGHTS/DATA]. Principles to apply: (1) Lead with the insight, not the data, (2) Use one chart per slide (chart type recommendations included), (3) Annotate every chart with the 'so what', (4) Use comparison and contrast to make data meaningful, (5) Build to a single recommended action. Include: slide-by-slide script and chart design notes." },
      { title: "Change Communication Presentation", useCase: "Change Management", level: "intermediate", prompt: "Write an all-hands change communication presentation for [ORGANIZATION] announcing [MAJOR CHANGE: reorganization/layoffs/new strategy/acquisition]. Structure for empathy and clarity: (1) What is happening and when, (2) Why — the honest business context, (3) How we made this decision, (4) What it means for you (segment by impacted/not impacted), (5) What happens next (timeline, process), (6) How leadership will support, (7) Q&A readiness (pre-answer top 10 likely questions). Script the CEO opening personally." },
      { title: "Competitive Landscape Presentation", useCase: "Strategy", level: "intermediate", prompt: "Create a competitive landscape presentation for [COMPANY] in the [MARKET]. Include: (1) Market map — who are the players and how do they cluster, (2) Competitor profiles (top 5 — strengths, weaknesses, pricing, positioning), (3) Feature comparison matrix, (4) Customer perception map (2×2 positioning), (5) Our differentiation (where we win), (6) Competitive threats (what could hurt us), (7) Recommended competitive strategy moves. Present for internal strategy use." },
      { title: "Product Roadmap Presentation", useCase: "Product Management", level: "intermediate", prompt: "Build a product roadmap presentation for [PRODUCT] for [AUDIENCE: engineering/sales/investors/customers]. Sections: (1) Vision and north star, (2) Strategy — why these bets, (3) What we've built (last [X] months — impact), (4) What we're building now (current quarter), (5) What's next (next 2 quarters), (6) What we're not doing (and why), (7) How to stay updated. Each roadmap item: problem it solves, not feature description. Include NOW/NEXT/LATER timeline format." },
      { title: "Funding Round Presentation (Series A)", useCase: "Venture Fundraising", level: "intermediate", prompt: "Write the full narrative for a Series A fundraising presentation for [STARTUP]. 12–15 slides covering: (1) The 'why this matters now' hook, (2) Problem with customer pain evidence, (3) Solution and product demo path, (4) Market sizing (bottom-up), (5) Business model and unit economics, (6) Go-to-market, (7) Traction (key metrics, growth rate, NRR, best customer logos), (8) Competitive differentiation (the secret weapon), (9) Team (why us), (10) Financial projections (3 years, use of funds), (11) Vision at scale, (12) The Ask. Memorize the rule: every slide must make the investor more confident, not more confused." },
      { title: "Strategy Off-Site Facilitation Pack", useCase: "Leadership Strategy", level: "intermediate", prompt: "Design a full strategy off-site facilitation pack for [COMPANY] leadership team of [X PEOPLE] over [1/1.5/2 DAYS]. Include: (1) Pre-work to send attendees (3 questions to reflect on), (2) Day 1 agenda (diagnostic and ambition), (3) Day 2 agenda (strategic choices and action planning), (4) Facilitation guides for each session, (5) Frameworks to use (Porter's, Blue Ocean, Where to Play/How to Win), (6) Output templates (strategy canvas, priority matrix), (7) Decision-making protocol for disagreements, (8) Post-off-site communication plan." },
      { title: "Thought Leadership Talk Proposal", useCase: "Speaking / PR", level: "intermediate", prompt: "Write a speaking proposal for [SPEAKER NAME], a [TITLE/ROLE], to speak at [CONFERENCE TYPE] events. Include: (1) Speaker bio (100 words and 50-word versions), (2) Three talk topics with titles, abstracts (150 words each), and key audience takeaways, (3) Why this speaker and why now, (4) Speaking credentials and past events, (5) A/V and logistics requirements, (6) What makes these talks different from typical [INDUSTRY] talks. Format for submission to conference organizers." },
      { title: "Sales QBR Deck (Customer-Facing)", useCase: "Account Management", level: "intermediate", prompt: "Build a customer-facing QBR (Quarterly Business Review) deck for an enterprise customer using [PRODUCT/SERVICE]. Sections: (1) Relationship overview (tenure, products, team contacts), (2) Q[X] business outcomes achieved (tied to their goals, not our features), (3) Usage data and trends, (4) ROI analysis, (5) Challenges encountered and resolved, (6) Q[X+1] mutual success plan, (7) Expansion opportunities (framed as their benefit), (8) Feedback and open discussion. Make the customer the hero — we're their partner." },
      { title: "Presentation Accessibility Audit", useCase: "Inclusive Design", level: "intermediate", prompt: "Audit the following presentation for accessibility and inclusive design: [DESCRIBE OR PASTE SLIDE CONTENT]. Check: (1) Color contrast on all text/background combinations, (2) Font size minimums (title/body/caption), (3) Alt text for all images and charts, (4) Slide reading order for screen readers, (5) Not relying on color alone to convey meaning, (6) Caption and transcript availability for any video, (7) Slide layout complexity, (8) Language clarity and jargon. Provide a fix list and a rewritten version of the 3 most problematic slides." },
      { title: "AI-Enhanced Presentation System", useCase: "AI Productivity", level: "advanced", prompt: "Design an AI-enhanced presentation creation system for [COMPANY/TEAM] that produces [X presentations/month]. Architecture: (1) Input brief format (audience, objective, key messages, data), (2) AI outline generation prompt (with brand voice and structure rules), (3) AI slide copy generation prompts per slide type, (4) Data visualization recommendation engine, (5) Design template system integration, (6) Human review and customization workflow, (7) Brand compliance checker, (8) Feedback loop to improve AI quality over time. Tool stack: [TOOLS]. Time reduction target: [X%]." },
      { title: "Executive Communication Coaching Guide", useCase: "Leadership Development", level: "advanced", prompt: "Write an executive communication coaching guide for [ROLE: C-suite / VP / Director] level leaders at [COMPANY]. Cover: (1) Executive presence principles (what creates authority and trust), (2) Structuring complex ideas simply (Pyramid Principle, BLUF), (3) Data storytelling for non-technical audiences, (4) Managing up (how to communicate with the board/CEO), (5) Townhall communication best practices, (6) Crisis and difficult news communication, (7) Q&A mastery (bridging, redirecting, admitting uncertainty gracefully), (8) Virtual communication presence, (9) Feedback and practice protocol for improvement." },
      { title: "Large-Scale Event Keynote Design", useCase: "Events", level: "advanced", prompt: "Design the full keynote presentation experience for [EVENT NAME], a [X]-person [INDUSTRY] conference. Cover: (1) Keynote narrative arc (emotional journey of the audience from start to finish), (2) Opening moment — what happens in the first 60 seconds, (3) 5-act structure with transitions, (4) Set design and visual presentation direction, (5) Audience participation moments, (6) Demo/product reveal staging, (7) Guest speaker integration, (8) Closing call to action with measurement, (9) Rehearsal plan, (10) AV technical brief. Reference world-class keynote benchmarks." }
    ]
  },

  /* ============================================================
     NO-CODE
     ============================================================ */
  "No-Code": {
    free: [
      { title: "No-Code App Blueprint", useCase: "App Building", prompt: "Design a no-code app blueprint for [APP IDEA] using [TOOL: Bubble/Glide/Softr/Webflow]. Spec: (1) User personas and their core jobs-to-be-done, (2) Core pages/screens (list 5–8), (3) Data model (tables, fields, relationships), (4) Key workflows (3 main user flows), (5) Integrations needed (payments, auth, email, APIs), (6) Build complexity (easy/medium/hard per section), (7) Estimated build time, (8) MVP scope (what to cut for v1 launch)." },
      { title: "Automation Workflow in Make/Zapier", useCase: "Workflow Automation", prompt: "Design an automation workflow in [Zapier / Make / n8n] for this use case: [DESCRIBE MANUAL PROCESS]. Output: (1) Trigger: what starts the automation, (2) Filters: conditions to check, (3) Actions: step-by-step in order (app, action, data to pass), (4) Error handling: what to do when a step fails, (5) Testing plan: how to verify it works, (6) Maintenance notes: when it might break. Estimate time saved per week." },
      { title: "Webflow Site Structure", useCase: "Website Building", prompt: "Design the site structure for a [TYPE OF WEBSITE: portfolio / SaaS marketing site / agency / e-commerce] built in Webflow. Provide: (1) Sitemap (all pages and hierarchy), (2) CMS collections needed (what dynamic content exists), (3) Key sections per page, (4) Interactions and animations to plan for, (5) 3rd party integrations (forms, chat, analytics), (6) Responsive breakpoints to design for, (7) Webflow-specific build tips for this site type." }
    ],
    premium: [
      { title: "No-Code Tool Selection Guide", useCase: "Tool Selection", level: "beginner", prompt: "Help me choose the best no-code tool for building [PROJECT TYPE]. Evaluate these options: [LIST 3–4 TOOLS]. For each: strengths, limitations, learning curve (1–5), monthly cost at [SCALE], best use case fit, and one dealbreaker to watch out for. Based on my requirements — [DESCRIBE REQUIREMENTS] — recommend the best tool with a clear rationale." },
      { title: "Airtable Database Design", useCase: "Database / Operations", level: "beginner", prompt: "Design an Airtable base for managing [WORKFLOW/PROCESS: e.g., content calendar / project tracker / CRM]. Tables needed: [X tables]. For each table: fields (name, type, description), linked record relationships, views to create (grid/gallery/kanban/calendar), automations to set up, and sharing/permission settings. Include a data entry form design for [PRIMARY INPUT WORKFLOW]." },
      { title: "No-Code MVP Launch Plan", useCase: "Product Launch", level: "beginner", prompt: "Write a no-code MVP launch plan for [PRODUCT IDEA]. Cover: (1) Core value proposition (1 sentence), (2) MVP feature list (must-have vs. nice-to-have — brutal prioritization), (3) No-code tool stack recommendation, (4) Build plan (tasks in order, estimated hours), (5) Pre-launch landing page copy, (6) Waitlist strategy, (7) Beta user recruitment plan, (8) Success criteria to decide whether to continue building. Total build time target: [X WEEKS]." },
      { title: "Glide App Design", useCase: "Mobile App", level: "beginner", prompt: "Design a Glide app for [USE CASE] with data stored in [Google Sheets / Airtable]. App screens: [LIST 5 SCREENS]. For each screen: layout type, data source columns to display, actions (button, link, form), user roles and visibility rules. Include: sign-in method, push notifications plan, and share/embed strategy. Use case: [INTERNAL TOOL / CUSTOMER-FACING / COMMUNITY APP]." },
      { title: "Notion Workspace Design", useCase: "Productivity / Ops", level: "beginner", prompt: "Design a Notion workspace for [TEAM/INDIVIDUAL] managing [USE CASE: company wiki / project management / personal OS]. Structure: (1) Top-level page hierarchy, (2) Key databases with properties (task tracker, CRM, content calendar, etc.), (3) Templates to create for recurring workflows, (4) Relations between databases, (5) Dashboard design (linked views of key data), (6) Team permissions and sharing structure, (7) Getting started guide for new members." },
      { title: "Softr Client Portal", useCase: "Client Management", level: "beginner", prompt: "Design a client portal built in Softr connected to [Airtable / Google Sheets] for [BUSINESS TYPE]. Portal pages: (1) Login / client home dashboard, (2) Project status tracker, (3) Document library, (4) Invoice and payments view, (5) Support request form. For each page: data to display, client vs. team permission levels, and any conditional visibility rules. Include onboarding email copy for new client portal invites." },
      { title: "Typeform Survey Flow", useCase: "Forms & Surveys", level: "beginner", prompt: "Design a Typeform survey flow for [PURPOSE: lead qualification / customer feedback / onboarding / event registration]. Questions: [LIST CORE QUESTIONS]. Logic: (1) Branching rules (if answer is X, go to Y), (2) Personalization with answer piping, (3) Hidden fields to capture UTM data, (4) Thank you screen variations by segment, (5) Integration: where responses go (CRM / Airtable / email sequence), (6) Estimated completion time. Target completion rate: [X%]." },
      { title: "No-Code Internal Tool Blueprint", useCase: "Internal Tools", level: "beginner", prompt: "Design an internal tool for [COMPANY] to manage [PROCESS] using [TOOL: Retool / Appsmith / Softr / Glide]. Screens needed: (1) [SCREEN 1] — data to show, actions available, (2) [SCREEN 2], (3) [SCREEN 3]. Data sources: [APIs / databases]. User roles: [ADMIN / OPERATOR / VIEWER]. Key automations: [LIST]. Build complexity estimate. Alternatives considered and why this tool was chosen." },
      { title: "Webflow CMS Architecture", useCase: "Content Management", level: "beginner", prompt: "Design a Webflow CMS architecture for [WEBSITE TYPE: blog / portfolio / directory / case studies]. CMS collections needed: [LIST]. For each collection: fields (text, image, rich text, reference, multi-reference, option), required vs. optional, relationships to other collections, and the template page layout. Include: filtering and sorting approach, search implementation, and SEO field setup (meta title, description, OG image)." },
      { title: "No-Code E-commerce Store", useCase: "E-commerce", level: "beginner", prompt: "Design a no-code e-commerce store for [PRODUCT TYPE] using [Shopify / Webflow Commerce / Gumroad / Lemon Squeezy]. Setup plan: (1) Product catalog structure, (2) Store pages needed (home, shop, product, cart, checkout, about, FAQ), (3) Payment and shipping configuration, (4) Email automation setup (welcome, order confirm, abandoned cart), (5) Analytics tracking setup, (6) SEO configuration, (7) Launch checklist. Budget: [X]. Expected monthly orders: [X]." },
      { title: "Advanced Bubble.io App Architecture", useCase: "Full-Stack No-Code", level: "intermediate", prompt: "Architect a full Bubble.io application for [APP CONCEPT]. Cover: (1) Data types and fields (complete data model), (2) User roles and privacy rules, (3) Key workflows (5 critical workflows with trigger → action → condition logic), (4) API integrations (list endpoints and connection method), (5) Responsive design strategy, (6) Performance optimization (when to use Lists vs. Repeating Groups), (7) Plugin recommendations, (8) Hosting and scaling plan, (9) Testing and QA checklist before launch." },
      { title: "No-Code Agency Service Menu", useCase: "Agency Business", level: "intermediate", prompt: "Design a no-code agency service menu for [AGENCY NAME] specializing in [TOOLS: Webflow / Bubble / Zapier / Notion]. Service tiers: (1) Starter package (what's included, price, timeline), (2) Growth package, (3) Enterprise/retainer. For each tier: deliverables, typical use cases, client profile, what makes it profitable for the agency, and discovery questions to qualify prospects. Include a portfolio project idea for each service tier." },
      { title: "Make.com Complex Scenario", useCase: "Advanced Automation", level: "intermediate", prompt: "Design a complex Make.com scenario for [MULTI-STEP AUTOMATION USE CASE]. Blueprint: (1) Trigger and its data structure, (2) All modules in sequence with module type (router / iterator / aggregator / transformer), (3) Routing conditions with logic, (4) Data mapping at each step (key fields), (5) Error handler module placements, (6) Variables to set and where, (7) Webhook response if needed, (8) Testing approach with sample data, (9) Scheduling and ops settings." },
      { title: "No-Code SaaS Business Model", useCase: "SaaS Building", level: "intermediate", prompt: "Design a complete no-code SaaS business plan for [SAAS IDEA]. Cover: (1) Target customer and problem validation approach, (2) No-code tech stack to build it (primary builder + auth + payments + email + analytics), (3) Core feature set for v1, (4) Pricing model and tiers, (5) Go-to-market strategy (how to get first 100 customers without paid ads), (6) MRR targets (Month 1/3/6/12), (7) How to eventually hire or migrate to custom code if it takes off, (8) Total startup cost estimate." },
      { title: "Data Integration Architecture (No-Code)", useCase: "Data Operations", level: "intermediate", prompt: "Design a no-code data integration architecture connecting [LIST APPS] to create a unified operational system for [COMPANY TYPE]. Map: (1) Data flow diagram (which apps send/receive what data), (2) Master data source for each entity (customer / order / project / etc.), (3) Sync tools (Zapier/Make/Stitch/Fivetran — right tool per integration), (4) Data transformation requirements, (5) Conflict resolution rules, (6) Reporting layer (where all data surfaces for decisions), (7) Error monitoring and alerting." },
      { title: "No-Code Community Platform", useCase: "Community Building", level: "intermediate", prompt: "Design a no-code community platform for [COMMUNITY TYPE] using [Circle / Skool / Mighty Networks / Slack + Zapier]. Platform architecture: (1) Community structure (spaces/channels/groups), (2) Membership tiers and access rules, (3) Onboarding flow for new members, (4) Content types (discussions, courses, events, resources), (5) Engagement automation (welcome DM, milestone celebrations), (6) Monetization setup, (7) Analytics to track, (8) Moderation tools and community guidelines enforcement." },
      { title: "Retool Internal Dashboard", useCase: "Internal Tools", level: "intermediate", prompt: "Design a Retool dashboard for [USE CASE: operations / customer support / data team]. Components: (1) Data sources to connect (APIs, databases), (2) Dashboard sections (list 4–5 areas), (3) For each section: component type (table / chart / form / button), data query, user actions available, (4) User role permissions, (5) Calculated fields and transformations, (6) Filters and search functionality, (7) Export options, (8) Refresh and caching strategy." },
      { title: "No-Code Marketplace Build", useCase: "Marketplace", level: "intermediate", prompt: "Plan a no-code marketplace for [MARKETPLACE TYPE: freelancers / products / rentals / services] using [Sharetribe / Bubble / Webflow + Airtable]. Architecture: (1) User types (buyer / seller / admin), (2) Listing structure and fields, (3) Search and filter design, (4) Booking or transaction flow, (5) Payments (Stripe Connect setup), (6) Review and rating system, (7) Messaging between users, (8) Trust and safety features, (9) Admin moderation tools, (10) Revenue model (commission %, subscription, listing fee)." },
      { title: "AI + No-Code Integration Design", useCase: "AI-Powered No-Code", level: "intermediate", prompt: "Design an AI-powered feature integrated into a no-code app built in [TOOL]. AI use case: [e.g., auto-generate product descriptions / smart form suggestions / automated tagging / sentiment analysis]. Integration design: (1) Which AI API to use (OpenAI/Claude/Gemini — justify), (2) Trigger for AI call (user action / form submit / scheduled), (3) Prompt template with dynamic data injection, (4) API call setup in [TOOL], (5) Output handling and storage, (6) Error handling, (7) Cost estimation per AI call, (8) User-facing UX for the AI feature." },
      { title: "No-Code Platform Migration Plan", useCase: "Platform Migration", level: "advanced", prompt: "Plan a migration from [CURRENT NO-CODE PLATFORM] to [NEW PLATFORM] for [APP/WEBSITE]. Cover: (1) Audit of current platform (pages, workflows, data, integrations), (2) Feature parity assessment on new platform, (3) Data migration approach (export format, import process, validation), (4) Rebuild prioritization (critical path vs. nice-to-have), (5) Parallel running period, (6) SEO preservation (if applicable), (7) User communication plan, (8) Cutover checklist and rollback plan, (9) Post-migration performance benchmark." },
      { title: "No-Code Enterprise Deployment", useCase: "Enterprise No-Code", level: "advanced", prompt: "Design an enterprise no-code deployment strategy for [COMPANY] enabling [X DEPARTMENTS] to build their own tools. Cover: (1) Platform governance model (approved tools, security requirements), (2) Center of excellence structure (training, templates, support), (3) Security and data handling standards, (4) Integration standards (approved APIs, auth methods), (5) Review and approval process for apps going to production, (6) Shadow IT risk mitigation, (7) Success metrics (apps built, time-to-value, IT ticket reduction), (8) Scaling from pilot to company-wide rollout." },
      { title: "No-Code SaaS Scale Architecture", useCase: "Scale", level: "advanced", prompt: "Design the architecture for scaling a [BUBBLE / WEBFLOW + MEMBERSTACK] SaaS from [CURRENT USERS] to [TARGET USERS]. Address: (1) Database performance optimization (indexes, search optimization, data archiving), (2) Workflow performance (recursive loop mitigation, async processing), (3) CDN and caching configuration, (4) Multi-region or edge considerations, (5) API rate limit management, (6) When to migrate off no-code to custom code (and what to migrate first), (7) Load testing approach, (8) Cost model at scale." }
    ]
  },

  /* ============================================================
     LEGAL
     ============================================================ */
  "Legal": {
    free: [
      { title: "Contract Review Checklist", useCase: "Contract Management", prompt: "Create a contract review checklist for a [CONTRACT TYPE: e.g., SaaS agreement / freelance contract / NDA / vendor agreement]. For each critical clause category: what to look for, what 'good' looks like vs. red flags, and what to negotiate. Categories: (1) Scope and deliverables, (2) Payment terms, (3) Intellectual property, (4) Liability and indemnification, (5) Termination rights, (6) Dispute resolution, (7) Confidentiality, (8) Governing law. Note: this is a review guide, not legal advice." },
      { title: "Privacy Policy Generator Prompt", useCase: "Compliance", prompt: "Help me draft the key sections of a privacy policy for [WEBSITE/APP NAME], a [TYPE OF BUSINESS] that collects: [LIST DATA COLLECTED: e.g., email, name, payment info, usage data]. We operate in [JURISDICTIONS: e.g., US / EU / global]. Cover: what data we collect and why, how we use it, who we share it with, user rights, data retention, cookies, and contact information. Plain language, legally grounded framework. Note: have an attorney review before publishing." },
      { title: "Terms of Service Framework", useCase: "Legal Documents", prompt: "Create a Terms of Service framework for [PRODUCT/SERVICE NAME] by [COMPANY]. Key sections to include: (1) Acceptance of terms, (2) Account registration and responsibilities, (3) Acceptable use policy, (4) Intellectual property ownership, (5) Payment terms (if applicable), (6) Disclaimers and limitation of liability, (7) Termination rights (both sides), (8) Dispute resolution, (9) Changes to terms, (10) Contact information. Plain, enforceable language. Note: legal review required." }
    ],
    premium: [
      { title: "NDA Template Builder", useCase: "Confidentiality", level: "beginner", prompt: "Draft the key clauses for a mutual NDA (Non-Disclosure Agreement) between [PARTY A TYPE] and [PARTY B TYPE] for the purpose of [PURPOSE: e.g., exploring a business partnership / vendor relationship / M&A discussions]. Include: definition of confidential information, exclusions from confidentiality, obligations of receiving party, permitted disclosures, term and termination, remedies for breach. Note: framework only — attorney review required." },
      { title: "Freelance Contract Essentials", useCase: "Freelance", level: "beginner", prompt: "Outline the essential clauses for a freelance contract for a [FREELANCER TYPE: designer/developer/writer] providing services to [CLIENT TYPE]. Cover: (1) Scope of work (deliverables, revisions policy), (2) Payment schedule and late payment fees, (3) Intellectual property (who owns what, when transfer occurs), (4) Kill fee clause, (5) Confidentiality, (6) Independent contractor status, (7) Limitation of liability, (8) Termination, (9) Governing law. Practical and enforceable. Note: consult an attorney." },
      { title: "GDPR Compliance Checklist", useCase: "Data Privacy", level: "beginner", prompt: "Create a GDPR compliance checklist for [COMPANY TYPE] that processes personal data of EU residents. Categories: (1) Lawful basis for processing, (2) Privacy notice requirements, (3) Consent management (if consent is the lawful basis), (4) Data subject rights fulfillment (access, erasure, portability, objection), (5) Data processing agreements with third parties, (6) Data breach notification procedures, (7) Data protection impact assessments (DPIA), (8) Record of processing activities, (9) DPO requirement check, (10) Cross-border transfer mechanisms." },
      { title: "IP Ownership Clause Guidance", useCase: "Intellectual Property", level: "beginner", prompt: "Explain and draft key IP ownership clauses for [CONTEXT: employee agreement / contractor agreement / joint venture / software development contract]. Cover: (1) Work-for-hire provisions, (2) Assignment of inventions, (3) Prior inventions carve-out, (4) License-back provisions, (5) Open source usage restrictions, (6) Moral rights waiver (where applicable), (7) AI-generated content ownership. For each clause: purpose, key language, and what each party negotiates. Note: legal review required." },
      { title: "Terms & Conditions for SaaS", useCase: "SaaS Legal", level: "beginner", prompt: "Outline a SaaS subscription agreement framework for [SAAS PRODUCT]. Essential sections: (1) Subscription and access rights, (2) Customer data and security obligations, (3) Acceptable use policy, (4) Service level agreement (uptime commitment, credits), (5) Fees, billing, and renewals, (6) Intellectual property (each party's), (7) Confidentiality, (8) Warranty disclaimer, (9) Limitation of liability (cap and exclusions), (10) Indemnification (mutual or one-sided), (11) Term and termination, (12) Governing law. Note: attorney review required." },
      { title: "Employment Offer Letter Template", useCase: "HR / Legal", level: "beginner", prompt: "Draft an employment offer letter template for [COMPANY] for a [FULL-TIME / PART-TIME / CONTRACT] position. Include: job title, start date, compensation (salary and bonus), benefits summary, at-will employment statement (US) or notice period (UK/EU), conditions precedent (background check, right to work verification), expiration of offer, and signature block. Professional, welcoming tone. Note: employment law varies by jurisdiction — consult an attorney." },
      { title: "SLA (Service Level Agreement) Framework", useCase: "Vendor Agreements", level: "beginner", prompt: "Draft an SLA framework for [SERVICE TYPE] between [SERVICE PROVIDER] and [CUSTOMER]. Define: (1) Service description and scope, (2) Uptime/availability commitment (%), (3) Response and resolution time targets by severity tier, (4) Measurement methodology, (5) Reporting cadence, (6) Credit calculation for SLA breaches, (7) Exclusions (scheduled maintenance, force majeure), (8) Review and amendment process. Balance between provider protection and customer assurance." },
      { title: "IP Assignment Agreement", useCase: "IP Transfer", level: "beginner", prompt: "Draft the framework for an IP assignment agreement where [ASSIGNOR: e.g., founder / contractor / employee] assigns intellectual property to [ASSIGNEE: company]. Cover: (1) Definition of assigned IP (specific works, inventions, code), (2) Scope of assignment (worldwide, in perpetuity), (3) Consideration, (4) Representations and warranties, (5) Assistance obligations post-assignment, (6) Prior IP carve-out list, (7) Moral rights waiver. Note: this is a framework — engage an IP attorney before signing." },
      { title: "Cookie Consent Policy", useCase: "Web Compliance", level: "beginner", prompt: "Draft a cookie consent policy and banner copy for [WEBSITE/APP]. Cover: (1) Categories of cookies used (strictly necessary, functional, analytics, marketing), (2) Purpose and description of each cookie category, (3) Third-party cookies (list by provider), (4) User consent mechanism (opt-in for non-essential), (5) How to withdraw consent, (6) Cookie banner copy options (3 versions: minimal, detailed, layered), (7) Cookie policy page structure, (8) Compliance checklist for GDPR/ePrivacy/CCPA." },
      { title: "Employment Contract Essentials", useCase: "HR / Legal", level: "beginner", prompt: "Outline essential employment contract clauses for [JURISDICTION: US/UK/EU] for a [EMPLOYEE TYPE: full-time / part-time / executive]. Include: (1) Parties and role definition, (2) Compensation and benefits, (3) Working hours, (4) Confidentiality obligations, (5) Non-solicitation and non-compete (where enforceable), (6) IP assignment, (7) At-will/notice period termination, (8) Dispute resolution, (9) Governing law, (10) Anti-moonlighting clause. Practical guidance on what's negotiable and what's standard." },
      { title: "Vendor Contract Negotiation Guide", useCase: "Procurement Legal", level: "intermediate", prompt: "Write a vendor contract negotiation guide for [COMPANY TYPE] procuring [SERVICES/SOFTWARE/GOODS]. For each key clause: (1) What the vendor's standard language typically says, (2) The buyer's ideal position, (3) A realistic compromise, (4) Must-have vs. nice-to-have classification, (5) Specific fallback language to propose. Clause focus: payment terms, IP ownership, data security and privacy, SLAs, liability cap, indemnification, termination for convenience, and price escalation." },
      { title: "Data Processing Agreement (DPA) Framework", useCase: "Data Privacy", level: "intermediate", prompt: "Draft a Data Processing Agreement (DPA) framework compliant with GDPR Article 28. Required provisions: (1) Scope, nature, and purpose of processing, (2) Duration of processing, (3) Processor obligations (data security, confidentiality, subprocessor restrictions), (4) Sub-processor approval process, (5) Data subject rights assistance, (6) Security measures description (technical and organizational), (7) Breach notification obligation, (8) Deletion or return of data on termination, (9) Audit rights. Controller-friendly default language." },
      { title: "Startup Legal Checklist", useCase: "Startup Legal", level: "intermediate", prompt: "Create a legal foundation checklist for an early-stage startup ([COUNTRY: US/UK/EU]). Cover: (1) Entity formation (type, jurisdiction, structure), (2) Founders' agreements (equity split, vesting, IP assignment), (3) Cap table management, (4) IP protection (trademarks, domains, provisional patents), (5) Employment and contractor agreements, (6) Customer contracts (terms, privacy policy), (7) Regulatory compliance for [INDUSTRY], (8) Insurance requirements, (9) Initial equity grants and option pool, (10) Investment agreement basics. Timeline: what to do immediately vs. when you hire vs. at fundraising." },
      { title: "Terms of Service for App/Marketplace", useCase: "Platform Legal", level: "intermediate", prompt: "Outline comprehensive Terms of Service for a [MARKETPLACE / APP / PLATFORM] involving multiple user types ([USER TYPES: e.g., buyers and sellers / creators and subscribers]). Additional clauses beyond basic ToS: (1) User conduct and community standards, (2) Content ownership and license grant to platform, (3) Content moderation and removal policies, (4) Transaction terms and fee disclosure, (5) Dispute resolution between users, (6) Platform liability limitations for third-party content/transactions, (7) DMCA takedown process, (8) Account suspension and appeals. Note: platform-specific legal complexity — attorney required." },
      { title: "Corporate Policy Drafting Guide", useCase: "Corporate Governance", level: "intermediate", prompt: "Write a drafting guide for corporate policies at [COMPANY]. For each policy type (Code of Conduct, Anti-Bribery/FCPA, Whistleblower, Conflicts of Interest, Data Retention, Social Media, Expense Reimbursement): (1) Required elements, (2) Common drafting mistakes to avoid, (3) Approval and maintenance process, (4) Training requirements, (5) Consequences of violation section guidance. Include: a policy template structure applicable to all policies." },
      { title: "Patent Application Strategy", useCase: "IP Strategy", level: "intermediate", prompt: "Develop a patent application strategy for [COMPANY] with [TECHNOLOGY/INVENTION]. Cover: (1) Patentability assessment (novelty, non-obviousness, utility), (2) Patent type selection (utility / design / provisional), (3) Filing sequence (provisional first — advantages and timeline), (4) Geographic filing strategy (US, PCT, key markets), (5) Claim drafting strategy (broad independent claims, narrower dependent claims), (6) Prior art search approach, (7) Timeline from filing to grant, (8) Budget estimate, (9) Continuation and divisional strategy, (10) How to work with a patent attorney efficiently." },
      { title: "Regulatory Compliance Program Design", useCase: "Compliance", level: "intermediate", prompt: "Design a regulatory compliance program for [COMPANY] in [INDUSTRY: fintech/healthtech/edtech/data broker]. Cover: (1) Applicable regulation mapping ([REGULATIONS: GDPR/CCPA/HIPAA/SOX/PCI-DSS/etc.]), (2) Compliance gap assessment, (3) Policies and procedures required, (4) Employee training program, (5) Data mapping and privacy impact assessments, (6) Vendor management compliance, (7) Audit and testing schedule, (8) Incident response plan, (9) Regulatory relationship management, (10) Compliance monitoring metrics." },
      { title: "Open Source License Guide", useCase: "Software IP", level: "intermediate", prompt: "Create a practical open source license guide for [COMPANY]'s software engineering team. Cover: (1) Key license categories (permissive: MIT/Apache/BSD vs. copyleft: GPL/LGPL/AGPL), (2) What each license allows and restricts, (3) License compatibility matrix, (4) Approved and prohibited licenses for different use cases (internal tool / SaaS product / embedded/distributed), (5) AGPL-specific risk for SaaS, (6) Contribution to open source projects policy, (7) Audit tools and process, (8) Remediation process for license violations." },
      { title: "M&A Legal Due Diligence Framework", useCase: "M&A Legal", level: "intermediate", prompt: "Design an M&A legal due diligence framework for acquiring [COMPANY TYPE]. Work streams: (1) Corporate structure and capitalization, (2) Material contracts review (customer, vendor, employment, real estate), (3) Intellectual property audit, (4) Litigation and regulatory exposure, (5) Employment and labor law compliance, (6) Data privacy and security, (7) Real property, (8) Environmental (if applicable), (9) Insurance coverage, (10) Regulatory approvals required. For each: document request list, key questions, and red flag indicators." },
      { title: "AI Legal Risk Framework", useCase: "AI Law", level: "advanced", prompt: "Develop an AI legal risk framework for [COMPANY] deploying AI [SYSTEMS/PRODUCTS]. Analyze risks across: (1) IP and copyright (training data, output ownership, fair use), (2) Privacy and data protection (personal data in training and inference), (3) Bias and discrimination liability, (4) Product liability for AI decisions, (5) Consumer protection and advertising law, (6) Regulatory compliance (EU AI Act tiers, US sector-specific rules), (7) Contractual liability to customers for AI outputs, (8) Employee relations (displacement, surveillance, management by AI). For each risk: exposure level, existing law, emerging regulation, and mitigation strategies." },
      { title: "Data Privacy Program Design", useCase: "Privacy Law", level: "advanced", prompt: "Design a global data privacy compliance program for [COMPANY] operating in [JURISDICTIONS]. Cover: (1) Applicable law mapping (GDPR/CCPA/LGPD/PIPL/etc.) and conflict resolution, (2) Data inventory and mapping methodology, (3) Privacy by design integration into product development, (4) Consent management platform requirements, (5) Data subject rights fulfillment system, (6) Third-party and vendor privacy management, (7) Cross-border data transfer mechanisms, (8) Privacy impact assessment process, (9) Breach response plan, (10) DPO/CPO structure, (11) Employee training program." },
      { title: "Term Sheet Negotiation Guide", useCase: "Venture / M&A", level: "advanced", prompt: "Write a term sheet negotiation guide for [STARTUP FOUNDERS / ACQUIREES] navigating a [SERIES A / ACQUISITION] term sheet. For each key term: (1) Pre-money valuation and dilution math, (2) Liquidation preference (1x non-participating vs. participating — impact at exit), (3) Anti-dilution provisions (broad-based vs. narrow-based weighted average vs. full ratchet), (4) Protective provisions and veto rights, (5) Board composition, (6) Pro-rata rights, (7) Information rights, (8) Founder vesting and acceleration, (9) ROFR / co-sale, (10) No-shop clause. Explain each term's economic and control implications." }
    ]
  },

  /* ============================================================
     CUSTOMER SUPPORT  (merges "Support" + "Customer Support")
     ============================================================ */
  "Customer Support": {
    free: [
      { title: "Support Response Templates", useCase: "Customer Service", prompt: "Write 5 customer support email response templates for [COMPANY/PRODUCT TYPE]. Templates: (1) 'I can't log in' — account access issue, (2) Billing question / overcharge, (3) Product not working as expected, (4) Refund request, (5) Feature request acknowledgment. Each template: empathetic opener, clear resolution or next steps, timeline expectation setting, and a warm close. Tone: [BRAND VOICE: friendly/professional/tech-forward]." },
      { title: "Help Center Article", useCase: "Self-Service Support", prompt: "Write a help center article for [PRODUCT/FEATURE] titled '[ARTICLE TITLE]'. Structure: (1) One-sentence overview of what this article covers, (2) Prerequisites or context, (3) Step-by-step instructions (numbered, with screenshots placeholders [IMAGE: describe what to show]), (4) Common questions or edge cases, (5) Troubleshooting section (3 common problems + solutions), (6) Related articles. Tone: clear, friendly, jargon-free. Reading level: 8th grade." },
      { title: "Customer Complaint Handling Script", useCase: "Escalation Management", prompt: "Write a customer complaint handling script for [TYPE OF COMPLAINT: e.g., defective product / service failure / billing error / rude staff experience] for a [CHANNEL: phone / live chat / email]. Flow: (1) Active listening and empathy opener, (2) Acknowledgment (without admitting fault prematurely), (3) Information gathering (what exactly happened), (4) Solution options (2–3 options), (5) Resolution confirmation, (6) Follow-up commitment, (7) Closing that leaves the customer feeling heard and valued." }
    ],
    premium: [
      { title: "CSAT Survey Design", useCase: "Satisfaction Measurement", level: "beginner", prompt: "Design a post-support CSAT (Customer Satisfaction) survey for [COMPANY]. Include: (1) Core CSAT question (1–5 or smiley scale), (2) NPS question (0–10), (3) Ease of resolution question (CES), (4) 2 open-ended follow-up questions based on score, (5) Agent-specific rating option, (6) Opt-in to share as testimonial. Delivery: [TIMING: immediately post-resolution / 24 hours later]. Response incentive strategy." },
      { title: "Escalation Matrix Design", useCase: "Support Operations", level: "beginner", prompt: "Design a customer support escalation matrix for [COMPANY]. Define: (1) Tier 1 (frontline) — scope, tools, resolution authority, escalation triggers, (2) Tier 2 (specialist) — scope, additional authority, escalation triggers, (3) Tier 3 (engineering/management) — scope, escalation criteria, (4) Executive escalation — when and who. For each tier: response time SLAs by priority level (P1/P2/P3/P4). Handling instructions for each escalation type." },
      { title: "Chatbot FAQ Script", useCase: "Chatbot / AI Support", level: "beginner", prompt: "Write a chatbot FAQ script for [PRODUCT/SERVICE]. Cover the top 10 questions customers ask. For each question: (1) Question variants (3 ways it's phrased), (2) Answer (2–3 sentences max, clear and actionable), (3) Follow-up options to offer (button prompts), (4) Escalation trigger (when the chatbot should hand off to a human). Tone: conversational, friendly, brand-appropriate. Add a fallback response for unknown questions." },
      { title: "Support Knowledge Base Structure", useCase: "Self-Service", level: "beginner", prompt: "Design the knowledge base structure for [PRODUCT/SERVICE]. Categories: [LIST 5–8 TOP CATEGORIES]. For each category: subcategories, top 5 article titles, content type (how-to / troubleshooting / conceptual / FAQ), priority (high/medium), and who maintains it. Include: search optimization tips for each article, article template, internal linking strategy, and freshness review cadence." },
      { title: "Onboarding Troubleshooting Guide", useCase: "Onboarding Support", level: "beginner", prompt: "Write a troubleshooting guide for new users of [PRODUCT] who are stuck during onboarding. Cover the top 5 drop-off points: [LIST KEY ONBOARDING STEPS]. For each: (1) What the user is trying to do, (2) Common errors or confusion points, (3) Step-by-step fix, (4) Screenshot/video placeholder, (5) When to contact support. Tone: patient, encouraging, clear. Reading level: beginner user." },
      { title: "Support SLA Framework", useCase: "Support Operations", level: "beginner", prompt: "Design a support SLA (Service Level Agreement) framework for [COMPANY]. Tiers: (1) Critical/P1 (system down, data loss), (2) High/P2 (major feature broken), (3) Medium/P3 (minor issue, workaround exists), (4) Low/P4 (question, cosmetic issue). For each tier: first response time, resolution time target, communication cadence during resolution, escalation path. Define tiers for: [FREE / PRO / ENTERPRISE] customer segments." },
      { title: "Product Bug Report Template", useCase: "QA / Support", level: "beginner", prompt: "Create a customer-facing bug report template for [PRODUCT]. Fields: (1) Issue summary (1 sentence), (2) Steps to reproduce (numbered), (3) Expected behavior, (4) Actual behavior, (5) Frequency (always/sometimes/once), (6) Environment (browser, OS, device, app version), (7) Screenshot or recording upload, (8) Business impact / urgency. Also write the automated confirmation email acknowledging the bug report with realistic next steps." },
      { title: "VIP Customer Protocol", useCase: "Customer Success", level: "beginner", prompt: "Design a VIP customer support protocol for [COMPANY]'s top [X%] customers by revenue. Cover: (1) VIP identification criteria, (2) Dedicated support channel (private Slack / dedicated CSM / priority queue), (3) SLA upgrades vs. standard customers, (4) Proactive outreach cadence, (5) Executive sponsor assignment, (6) Issue escalation priority handling, (7) QBR and check-in structure, (8) Recognition and appreciation gestures." },
      { title: "Return/Refund Policy Communication", useCase: "E-commerce Support", level: "beginner", prompt: "Write customer-facing communication templates for handling returns and refunds at [E-COMMERCE STORE]. Templates: (1) Return approved (with instructions), (2) Return denied (with reason and alternative), (3) Refund processed (confirmation), (4) Refund delayed (status update), (5) Exchange processed. Each: empathetic, clear, includes timeline expectation, and brand-appropriate tone. Include: FAQ answers for top 5 return/refund questions." },
      { title: "Live Chat Support Playbook", useCase: "Live Chat", level: "beginner", prompt: "Write a live chat support playbook for [COMPANY]'s support team. Cover: (1) Chat opening scripts (3 variations by context: proactive/reactive/returning customer), (2) Typing speed and response time expectations, (3) Handling multiple concurrent chats, (4) Canned response library (10 common scenarios), (5) Tone guidelines for chat (warmer and shorter than email), (6) When to escalate to voice, (7) Chat closing scripts, (8) CSAT survey prompt at close." },
      { title: "Customer Support Metrics Dashboard", useCase: "Support Analytics", level: "intermediate", prompt: "Design a customer support metrics dashboard for [COMPANY]. Metrics: (1) Volume (tickets/day by channel and category), (2) Response time (first response, full resolution by priority tier), (3) CSAT score (by agent, channel, ticket type), (4) NPS, (5) First Contact Resolution (FCR) rate, (6) Deflection rate (self-service vs. human), (7) Backlog and queue health, (8) Cost per ticket, (9) Escalation rate. Visualization type for each. Alert thresholds. Weekly and monthly report format." },
      { title: "AI-Powered Support System Design", useCase: "AI Customer Support", level: "intermediate", prompt: "Design an AI-powered customer support system for [COMPANY]. Architecture: (1) AI triage layer (classify intent and route), (2) AI auto-resolution for [X%] of tickets (which types, confidence threshold), (3) AI-assisted agent responses (draft + suggest), (4) Human review triggers, (5) Knowledge base integration for grounding AI responses, (6) Escalation logic from AI to human, (7) Agent feedback loop to improve AI, (8) Quality monitoring (hallucination rate, satisfaction vs. AI-handled tickets), (9) Tool stack recommendation." },
      { title: "Omnichannel Support Strategy", useCase: "Support Strategy", level: "intermediate", prompt: "Design an omnichannel support strategy for [COMPANY] across [CHANNELS: email/live chat/phone/social/self-service/community]. For each channel: (1) Use case fit (what request types suit this channel), (2) SLA targets, (3) Tone and format guidelines, (4) Channel-specific tools, (5) Handoff between channels (how to maintain context). Cross-channel: unified customer history, consistent resolution tracking, and attribution of support to customer LTV impact." },
      { title: "Customer Feedback Loop System", useCase: "VOC (Voice of Customer)", level: "intermediate", prompt: "Design a customer feedback loop system for [COMPANY]. Sources: (1) CSAT/NPS surveys, (2) Support ticket themes, (3) Product reviews (G2/Trustpilot/App Store), (4) Community posts, (5) Sales and CS call insights. Process: (1) Collection and centralization, (2) Categorization and tagging, (3) Quantitative trend analysis, (4) Qualitative theme synthesis, (5) Distribution to Product, Marketing, Sales, CS, (6) Closed-loop response to customers, (7) Impact tracking (did we act on it?). Tools and owner assignments." },
      { title: "Support Team Training Program", useCase: "Team Development", level: "intermediate", prompt: "Design a support team training program for [COMPANY] onboarding new [FRONTLINE / SPECIALIZED] agents. Cover: (1) Week 1: product knowledge (key features, common issues), (2) Week 2: tools training (helpdesk, CRM, knowledge base), (3) Week 3: communication skills (tone, empathy, writing quality), (4) Week 4: live ticket shadowing and handling with supervision. Plus: ongoing training cadence (weekly tip, monthly deep-dive, quarterly certification). QA rubric for evaluating ticket quality." },
      { title: "Proactive Support Program", useCase: "Proactive CX", level: "intermediate", prompt: "Design a proactive customer support program for [PRODUCT] that prevents tickets before they're created. Triggers to monitor: (1) Usage drop (below [X] actions/week), (2) Feature not adopted after [X] days, (3) Failed payments, (4) Approaching plan limits, (5) Recent product issues (bug fix deployed). For each trigger: automated or manual outreach method, message template, response tracking, and escalation to CSM if no response. Goal: reduce reactive ticket volume by [X%]." },
      { title: "Support Cost Reduction Strategy", useCase: "Support Operations", level: "intermediate", prompt: "Design a support cost reduction strategy for [COMPANY] with a support team of [X AGENTS] handling [X TICKETS/MONTH]. Levers: (1) Self-service deflection (knowledge base, video tutorials, chatbot — target [X%] deflection rate), (2) Ticket prevention (proactive communication, product UX improvements), (3) Handle time reduction (better tooling, macros, AI assist), (4) Tier 1 resolution rate improvement, (5) Channel shift to lower-cost channels. For each lever: current state, target, action plan, and projected savings." },
      { title: "Global Support Operations Design", useCase: "Global Support", level: "intermediate", prompt: "Design a global customer support operations model for [COMPANY] serving customers in [REGIONS: NA/EMEA/APAC]. Cover: (1) Follow-the-sun support schedule, (2) Regional team structure and hiring, (3) Language support strategy (bilingual agents vs. translation tools vs. local outsourcing), (4) Knowledge base localization, (5) Escalation paths across regions, (6) Cultural adaptation in communication style, (7) Quality consistency across regions, (8) Technology stack for global ticketing, (9) Regional SLA variations." },
      { title: "Support-Driven Growth Strategy", useCase: "Support ROI", level: "intermediate", prompt: "Design a strategy to make customer support a growth driver at [COMPANY]. Cover: (1) Revenue recovery through support (save plays during cancellation flow), (2) Expansion opportunities surfaced by support (upsell triggers in ticket handling), (3) Referral generation from delighted customers, (4) Product feedback loop creating competitive advantages, (5) Support story for marketing (testimonials, case studies from support resolutions), (6) Support quality as NPS driver, (7) Metrics to prove support ROI to the board." },
      { title: "AI Agent Prompt System for Support", useCase: "AI Support Engineering", level: "advanced", prompt: "Build a complete AI agent prompt system for automated customer support at [COMPANY] for [PRODUCT]. System prompt: define the agent's persona, product knowledge scope, tone, escalation rules. Tool definitions: (1) Look up account information, (2) Check order/subscription status, (3) Process refund (with rules), (4) Create support ticket, (5) Search knowledge base. Flows: 5 common scenarios fully scripted (start to resolution). Guardrails: what the agent must never do. Evaluation: 10 test cases to validate quality." },
      { title: "Enterprise Support Program Design", useCase: "Enterprise CX", level: "advanced", prompt: "Design a premium enterprise support program for [COMPANY]'s top-tier customers (ARR > [X]). Program tiers: Gold, Platinum, Diamond (or equivalent). For each tier: (1) Dedicated CSM model, (2) Priority support SLAs (P1 response in minutes), (3) Executive sponsor pairing, (4) Proactive health monitoring, (5) Custom onboarding and training, (6) Dedicated Slack channel, (7) Product roadmap access and beta program, (8) Business reviews (monthly/quarterly/annual), (9) On-site or virtual EBR, (10) Pricing model for the program." },
      { title: "CX Transformation Roadmap", useCase: "CX Strategy", level: "advanced", prompt: "Design a 12-month customer experience transformation roadmap for [COMPANY] improving from [CURRENT NPS/CSAT] to [TARGET]. Cover: (1) CX diagnostic (key pain points across the customer journey), (2) Quick wins (0–90 days), (3) System and process improvements (90–180 days), (4) Technology and AI investments (180–365 days), (5) Culture and team capability transformation, (6) Voice of customer program redesign, (7) Governance and CX ownership model, (8) Investment required, (9) ROI model (NPS → retention → revenue impact), (10) Board-level reporting framework." }
    ]
  },

  /* ============================================================
     HEALTH
     ============================================================ */
  "Health": {
    free: [
      { title: "Wellness Plan Creator", useCase: "Personal Health", prompt: "Create a personalized 30-day wellness plan for someone who is [AGE/PROFILE] with the goal of [HEALTH GOAL: e.g., improving sleep / reducing stress / building energy]. Plan includes: daily morning routine (15 min), weekly movement schedule (type, duration, frequency), nutrition focus areas (3 simple habits, not a diet), stress management practice (one technique), sleep hygiene checklist, and a weekly check-in ritual. Evidence-based, sustainable, no extreme measures." },
      { title: "Health App Feature Set", useCase: "Digital Health Product", prompt: "Design the core feature set for a health app focused on [HEALTH AREA: e.g., mental wellness / fitness tracking / chronic disease management / nutrition]. For each of 6 key features: feature name, user problem it solves, how it works (user flow in 3 steps), data required, and differentiation from [COMPETITOR APP]. Prioritize for MVP vs. V2." },
      { title: "Patient Education Content", useCase: "Healthcare Communication", prompt: "Write patient education content explaining [MEDICAL CONDITION / PROCEDURE / MEDICATION] in plain language for patients with an 8th-grade reading level. Cover: what it is (simple explanation), why it matters, what to expect, how to prepare or manage it, warning signs to watch for, and when to call your doctor. Include a 'key points' summary box. Note: this is educational only — not a replacement for medical advice." }
    ],
    premium: [
      { title: "Fitness Program Design", useCase: "Fitness", level: "beginner", prompt: "Design a [X]-week fitness program for a [BEGINNER/INTERMEDIATE/ADVANCED] person with the goal of [FITNESS GOAL: building strength/losing fat/improving endurance/general fitness]. Available equipment: [LIST]. Time per session: [X MINUTES]. Frequency: [X DAYS/WEEK]. Provide: weekly schedule, exercises per session (sets, reps, rest), progression plan (how to increase intensity weekly), warm-up and cool-down routine, and 3 substitution options for limited equipment." },
      { title: "Nutrition Meal Plan Framework", useCase: "Nutrition", level: "beginner", prompt: "Create a 1-week meal plan framework for someone with the goal of [HEALTH GOAL: weight loss/muscle gain/blood sugar management/heart health]. Dietary restrictions: [LIST]. Calories target: approximately [X] calories/day. Provide: 7 days of breakfast/lunch/dinner/snack ideas, key nutrition principles to follow (not strict tracking), a grocery list template, and 3 easy meal prep tips. Note: consult a registered dietitian for personalized medical nutrition therapy." },
      { title: "Mental Health Check-In Prompts", useCase: "Mental Wellness", level: "beginner", prompt: "Write a set of 10 mental health self-check-in journal prompts for adults dealing with [THEME: stress / anxiety / burnout / grief / relationship challenges]. Each prompt: open-ended, non-judgmental, encourages reflection without overwhelm, and includes a follow-up question to go deeper if the person is ready. Include a brief introduction about why journaling supports mental health. Note: professional support is irreplaceable." },
      { title: "Sleep Improvement Protocol", useCase: "Sleep Health", level: "beginner", prompt: "Design a 2-week sleep improvement protocol for someone who [SLEEP PROBLEM: has trouble falling asleep / wakes up at night / feels unrested despite 8 hours]. Evidence-based interventions to include: sleep restriction therapy basics, sleep hygiene checklist (10 practices), bedroom environment optimization, wind-down routine (30 min before bed), morning light exposure, and what to do when you can't sleep at 3am. Distinguish what is CBT-I vs. general advice." },
      { title: "Corporate Wellness Program Outline", useCase: "Employee Wellness", level: "beginner", prompt: "Design a corporate wellness program for a [COMPANY SIZE] company. Pillars: (1) Physical health (movement challenges, ergonomics, subsidized gym), (2) Mental health (EAP, meditation app, mental health days), (3) Nutrition (healthy snacks, lunch-and-learns), (4) Financial wellness (resources, benefits), (5) Social connection (team activities, community). For each pillar: 3 initiatives (free/low-cost and premium options), implementation steps, and engagement metric." },
      { title: "Chronic Disease Self-Management Guide", useCase: "Patient Education", level: "beginner", prompt: "Write a self-management guide for patients with [CONDITION: Type 2 Diabetes / Hypertension / COPD / Anxiety]. Cover: (1) Understanding your condition in plain language, (2) Daily monitoring checklist (what to track and when), (3) Medication adherence tips, (4) Lifestyle management (diet, exercise, sleep, stress specific to this condition), (5) Warning signs requiring medical attention, (6) Questions to ask your doctor at your next visit, (7) Support resources. Note: this supplements — not replaces — medical care." },
      { title: "Health & Wellness Content Calendar", useCase: "Health Marketing", level: "beginner", prompt: "Create a 30-day health and wellness content calendar for [BRAND TYPE: gym / wellness app / nutritionist / health coach] on [PLATFORM]. Mix: educational posts (40%), motivational/community posts (30%), promotional/offer posts (20%), user-generated/testimonial posts (10%). For each day: topic, content type (reel/carousel/static/story), hook line, and hashtag suggestion. Align with [HEALTH AWARENESS DATES / SEASONAL THEMES]." },
      { title: "Telehealth Patient Communication Scripts", useCase: "Digital Health", level: "beginner", prompt: "Write telehealth patient communication scripts for [HEALTHCARE PROVIDER TYPE]. Scripts needed: (1) Appointment reminder (48 hours before), (2) Day-of visit preparation instructions, (3) Post-visit follow-up (next steps, prescription info), (4) Lab results delivery (positive / requires follow-up / normal), (5) Missed appointment re-engagement. Each: HIPAA-friendly, warm but professional, appropriate for [SMS / EMAIL / PORTAL MESSAGE]. Personalization tokens: [PATIENT_NAME], [PROVIDER_NAME], [DATE]." },
      { title: "Health Coaching Session Framework", useCase: "Health Coaching", level: "beginner", prompt: "Design a health coaching session framework for a [X]-session coaching program focused on [HEALTH GOAL]. For each session: (1) Opening check-in (how are you doing since last time), (2) Progress review against commitments, (3) Core content / skill for this session, (4) Personalized action planning, (5) Commitment setting for next session, (6) Closing (acknowledgment of progress). Include: assessment tools for Session 1, motivational interviewing prompts, and a client worksheet template." },
      { title: "Mental Health App Feature Design", useCase: "Digital Mental Health", level: "beginner", prompt: "Design the core features for a mental health app targeting [AUDIENCE: adults with mild-moderate anxiety / teenagers / new parents / people in recovery]. Features: (1) Mood tracking (how it works, data model, insights generated), (2) Guided exercises (which modalities: CBT / mindfulness / DBT / etc.), (3) Crisis support (what to show, hotline integration, safety planning), (4) Progress visualization, (5) Therapist or coach integration, (6) Community feature (if appropriate). Trauma-informed design principles throughout." },
      { title: "Population Health Analytics Model", useCase: "Public Health", level: "intermediate", prompt: "Design a population health analytics model for [HEALTH SYSTEM / PUBLIC HEALTH DEPARTMENT] managing [POPULATION SIZE]. Cover: (1) Key population health metrics (preventable admissions, chronic disease prevalence, ED utilization, vaccination rates), (2) Risk stratification model (high/medium/low risk identification), (3) Data sources (EHR, claims, social determinants of health), (4) Intervention targeting logic, (5) Outcomes tracking, (6) Health equity analysis approach, (7) Reporting for clinical and executive stakeholders." },
      { title: "Digital Therapeutics Product Brief", useCase: "Digital Health Product", level: "intermediate", prompt: "Write a product brief for a digital therapeutic (DTx) for [CONDITION: e.g., insomnia / anxiety / chronic pain / ADHD]. Include: (1) Clinical rationale (evidence base for the therapeutic approach), (2) Target patient population, (3) Core therapeutic mechanisms (CBT-I / ACT / mindfulness / gamification), (4) Program structure (sessions, duration, frequency), (5) Clinical validation plan (trial design), (6) Regulatory pathway (SaMD classification, FDA breakthrough device), (7) Prescription vs. OTC model, (8) Integration with clinical workflow, (9) Outcome measures." },
      { title: "Healthcare Marketing Strategy", useCase: "Health Marketing", level: "intermediate", prompt: "Develop a marketing strategy for a [HEALTHCARE PROVIDER / DIGITAL HEALTH COMPANY / WELLNESS BRAND]. Cover: (1) Audience segmentation (patients, caregivers, payers, providers), (2) Positioning and messaging by audience, (3) Channel strategy (SEO/content, paid search, social, referral programs, events), (4) Trust and credibility building tactics, (5) HIPAA marketing compliance checklist, (6) Patient acquisition funnel, (7) Retention and engagement strategy, (8) KPIs (patient acquisition cost, engagement rate, clinical outcome correlation)." },
      { title: "Clinical Trial Recruitment Strategy", useCase: "Clinical Research", level: "intermediate", prompt: "Design a clinical trial recruitment strategy for a study on [CONDITION / TREATMENT] seeking [X PARTICIPANTS] in [TIMEFRAME]. Cover: (1) Eligibility criteria communication (plain language), (2) Recruitment channels (healthcare providers, patient communities, social media, registries), (3) Patient-facing materials (recruitment flyer, FAQ, consent summary), (4) Digital advertising approach, (5) Site activation and coordinator training, (6) Diversity and inclusion recruitment tactics, (7) Screening funnel metrics, (8) Retention strategies once enrolled." },
      { title: "Health Tech Regulatory Strategy", useCase: "Digital Health Compliance", level: "intermediate", prompt: "Develop a regulatory strategy for a [DIGITAL HEALTH PRODUCT: mobile app / wearable / AI diagnostic / digital therapeutic]. Cover: (1) Product classification (SaMD, wellness app, medical device — decision tree), (2) FDA regulatory pathway (510(k) / De Novo / PMA / exempt — justify), (3) EU MDR/IVDR classification, (4) Evidence requirements (clinical validation plan), (5) Quality management system requirements (ISO 13485), (6) Cybersecurity requirements (FDA guidance), (7) Data privacy (HIPAA, GDPR), (8) Regulatory submission timeline and cost estimate." },
      { title: "Workplace Mental Health Program", useCase: "Occupational Health", level: "intermediate", prompt: "Design a comprehensive workplace mental health program for [COMPANY SIZE / INDUSTRY]. Cover: (1) Program rationale and business case (ROI of mental health investment), (2) Destigmatization campaign, (3) Manager training (mental health first aid, recognizing warning signs, supportive conversations), (4) Employee resources (EAP, therapy access, crisis line), (5) Policy changes (mental health days, flexible work, workload management), (6) Environmental design (quiet spaces, natural light, ergonomics), (7) Measurement (utilization, absenteeism, self-reported wellbeing)." },
      { title: "Personal Health Data Platform Design", useCase: "Health Data", level: "intermediate", prompt: "Design a personal health data platform that aggregates [DATA SOURCES: wearables, EHR, nutrition apps, mental health apps, genomics]. Cover: (1) Data ingestion architecture (FHIR APIs, wearable SDKs, manual entry), (2) Data normalization and harmonization, (3) Privacy and consent architecture (granular sharing controls), (4) Insights engine (what patterns to surface and how), (5) Provider sharing workflow, (6) Data portability and export, (7) Security and HIPAA compliance, (8) User experience for non-technical patients, (9) Monetization model that respects privacy." },
      { title: "Behavioral Health Technology Assessment", useCase: "Mental Health Tech", level: "intermediate", prompt: "Conduct a technology assessment framework for evaluating behavioral health digital tools for [HEALTH SYSTEM / EMPLOYER / PAYER]. Evaluation criteria: (1) Clinical evidence base (RCT evidence, outcomes data), (2) Regulatory status (FDA clearance, CE mark), (3) Clinical validation methodology, (4) Engagement and adherence data, (5) Integration with EHR/care pathways, (6) Privacy and HIPAA compliance, (7) Equity considerations (language access, digital literacy), (8) Implementation support, (9) Total cost and ROI model. Score and recommend tool selection." },
      { title: "Pandemic / Public Health Emergency Response Plan", useCase: "Public Health", level: "intermediate", prompt: "Design a public health emergency response communication plan for [ORGANIZATION: health department / hospital / employer / school] for [EVENT TYPE: pandemic / outbreak / environmental health event]. Cover: (1) Risk communication principles, (2) Stakeholder communication matrix (who gets what information when), (3) Message templates by phase (pre-event / event onset / escalation / de-escalation / recovery), (4) Rumor and misinformation management, (5) Vulnerable population outreach, (6) Channel strategy (press, social media, email, text alerts), (7) Internal staff communication." },
      { title: "AI-Powered Clinical Decision Support Design", useCase: "Health AI", level: "advanced", prompt: "Design an AI-powered clinical decision support (CDS) system for [CLINICAL USE CASE: early sepsis detection / diagnostic imaging analysis / medication safety / chronic disease management]. Cover: (1) Clinical problem and current workflow, (2) AI model approach (rule-based vs. ML — justify), (3) Training data requirements and validation methodology, (4) Alert design (type, threshold, frequency — avoiding alert fatigue), (5) EHR integration architecture (SMART on FHIR, HL7), (6) Clinical validation trial design, (7) FDA SaMD classification and clearance pathway, (8) Bias and health equity audit, (9) Clinician adoption strategy, (10) Post-market surveillance plan." },
      { title: "Healthcare Data Strategy", useCase: "Health Data Science", level: "advanced", prompt: "Develop a healthcare data strategy for [HEALTH SYSTEM / DIGITAL HEALTH COMPANY] with the goal of [STRATEGIC OBJECTIVES]. Cover: (1) Data asset inventory (clinical, operational, financial, patient-generated), (2) Interoperability roadmap (FHIR adoption, health information exchange), (3) Data platform architecture (data lake, clinical data warehouse, real-time layer), (4) AI/ML use case prioritization, (5) Real-world evidence strategy, (6) Patient data rights and consent management, (7) Data partnership and monetization model, (8) Privacy-preserving analytics (federated learning, synthetic data), (9) Governance structure, (10) Build vs. buy decisions." },
      { title: "Digital Health Venture Analysis", useCase: "Health Investment", level: "advanced", prompt: "Write a digital health venture investment analysis framework for evaluating [DIGITAL HEALTH STARTUP] in the [MARKET: RPM / mental health / AI diagnostics / care navigation]. Cover: (1) Market sizing and growth dynamics, (2) Clinical evidence and validation quality, (3) Regulatory moat and pathway, (4) Business model and reimbursement pathway, (5) Customer acquisition and retention (B2B vs. B2C), (6) Competitive landscape, (7) Team assessment (clinical + technical + commercial), (8) Unit economics, (9) Key risks (reimbursement, evidence, adoption, competition), (10) Investment thesis and due diligence priorities." }
    ]
  }

}; // ← CLOSE PROMPT_CATEGORY_BANK

/* ============================================================
   TOOL-SPECIFIC OVERRIDES
   Custom free prompts for the top 20 most popular AI tools
   ============================================================ */
window.PROMPT_TOOL_OVERRIDES = {

  "chatgpt": {
    free: [
      { title: "Custom GPT System Prompt", useCase: "AI Customization", prompt: "You are [PERSONA NAME], a specialized AI assistant for [USE CASE]. Your expertise is [DOMAIN]. Audience: [DESCRIBE USERS]. Communication style: [TONE: e.g., concise and professional / warm and encouraging / technical and precise]. You always: [3 BEHAVIORAL RULES]. You never: [2 CONSTRAINTS]. When asked something outside your scope, say: [FALLBACK MESSAGE]. Start every conversation by asking: [OPENING QUESTION TO PERSONALIZE THE RESPONSE]." },
      { title: "Multi-Step Chain of Thought", useCase: "Complex Problem Solving", prompt: "Solve this problem step by step, showing your reasoning at each stage: [PROBLEM STATEMENT]. Use this framework: (1) Restate the problem in your own words, (2) Identify the key constraints and assumptions, (3) Break the problem into sub-problems, (4) Solve each sub-problem with reasoning shown, (5) Synthesize the solution, (6) Check your answer for logical consistency, (7) State the final answer clearly. If you're uncertain at any step, say so." },
      { title: "Expert Panel Simulation", useCase: "Decision Making", prompt: "Simulate a panel of 3 different experts analyzing [TOPIC/QUESTION/DECISION]. Expert 1: [ROLE: e.g., a skeptical data scientist]. Expert 2: [ROLE: e.g., a pragmatic business strategist]. Expert 3: [ROLE: e.g., a creative innovator]. Each expert: share your perspective in 3 sentences, then the most important counterargument to your own view in 2 sentences. After all three, synthesize the most balanced recommendation." }
    ]
  },

  "claude": {
    free: [
      { title: "Deep Document Analysis", useCase: "Research & Analysis", prompt: "Analyze the following document thoroughly: [PASTE DOCUMENT]. Provide: (1) A concise executive summary (150 words), (2) The 5 most important claims or insights, (3) Assumptions the author makes that may not hold, (4) What evidence supports the main argument, (5) What evidence is missing or weak, (6) Implications for [MY CONTEXT], (7) 3 questions the document raises but doesn't answer." },
      { title: "Socratic Learning Partner", useCase: "Education & Critical Thinking", prompt: "Be my Socratic learning partner on the topic of [SUBJECT]. Do not lecture me. Instead: (1) Ask me what I already know about [TOPIC], (2) Based on my answer, ask a probing question that reveals a gap or assumption in my thinking, (3) After each of my responses, validate what's correct, gently challenge what's incomplete, and ask the next question. Continue until we've covered [KEY CONCEPTS]. Summarize my learning journey at the end." },
      { title: "Long-Form Content with Nuance", useCase: "Writing", prompt: "Write a [X]-word [FORMAT: essay/article/report] on [TOPIC]. Approach this with genuine intellectual depth — not a surface-level overview. I want: counterintuitive insights, acknowledgment of genuine complexity and disagreement in the field, specific examples (not vague generalities), and a clear point of view by the end. Audience: [DESCRIBE]. Avoid clichés, hedge words ('arguably', 'it could be said'), and filler phrases." }
    ]
  },

  "deepseek": {
    free: [
      { title: "Advanced Code Generation", useCase: "Software Development", prompt: "Generate complete, production-ready [LANGUAGE] code for: [DETAILED SPECIFICATION]. Requirements: (1) Clean architecture with separation of concerns, (2) Full error handling, (3) Comprehensive inline documentation, (4) Unit tests for all critical functions, (5) Performance considerations noted in comments, (6) Security best practices applied. Include: a brief architecture explanation before the code, and a list of dependencies required." },
      { title: "Mathematical Problem Solver", useCase: "Math & Science", prompt: "Solve the following problem step by step, showing all work: [PROBLEM]. Format: (1) Problem restatement, (2) Given information and what we're solving for, (3) Approach selection with rationale, (4) Step-by-step solution with each mathematical operation explained, (5) Answer verification (substitute back or alternative method), (6) Answer clearly stated. If multiple approaches exist, briefly compare them." },
      { title: "Research Synthesis", useCase: "Academic Research", prompt: "Synthesize research on [TOPIC] across multiple perspectives. Cover: (1) The dominant scientific/academic consensus, (2) Significant dissenting or minority views (with their strongest arguments), (3) Key unanswered questions in the field, (4) Recent developments that are shifting understanding, (5) Practical implications of the research, (6) Quality assessment of evidence (what's well-established vs. preliminary). Target a graduate-level audience." }
    ]
  },

  "midjourney": {
    free: [
      { title: "Cinematic Scene Prompt", useCase: "Concept Art", prompt: "[SUBJECT DESCRIPTION], [ACTION/POSE], [ENVIRONMENT: location, time of day, weather], [LIGHTING: e.g., golden hour backlighting], [CAMERA: e.g., wide-angle shot from below], [STYLE: e.g., cinematic photography, shot on ARRI ALEXA], [MOOD: e.g., epic and otherworldly], [ADDITIONAL DETAILS: lens flare, volumetric fog, ultra-detailed], --ar 16:9 --v 6 --style raw --q 2" },
      { title: "Character Portrait Prompt", useCase: "Character Design", prompt: "Portrait of [CHARACTER DESCRIPTION: age, gender, ethnicity, expression], wearing [DETAILED OUTFIT/ARMOR], [HAIR STYLE AND COLOR], [DISTINCTIVE FEATURES], [BACKGROUND: minimal/detailed environment], [LIGHTING: e.g., dramatic Rembrandt lighting], [ART STYLE: e.g., digital painting / oil portrait / concept art], by [ARTIST REFERENCE if desired], ultra-detailed face, sharp focus, [MOOD], --ar 2:3 --v 6" },
      { title: "Product Visualization Prompt", useCase: "Product Design", prompt: "[PRODUCT NAME AND DESCRIPTION], [MATERIALS: e.g., brushed aluminum, matte black silicone], [ANGLE: e.g., 3/4 view slightly elevated], [BACKGROUND: e.g., floating on a pure white surface with soft shadow], [LIGHTING: e.g., professional studio 3-point lighting], [STYLE: e.g., Apple product photography aesthetic], high-end commercial product photography, ultra-sharp, 8K, --ar 1:1 --v 6 --style raw" }
    ]
  },

  "canva": {
    free: [
      { title: "Brand Kit Direction", useCase: "Visual Branding", prompt: "Design a brand kit for [BRAND NAME] — a [BUSINESS TYPE] that wants to feel [3 BRAND ADJECTIVES]. Primary color: [HEX or color description]. Secondary color: [HEX]. Accent: [HEX]. Typography: heading font ([STYLE: e.g., bold sans-serif / elegant serif]), body font ([STYLE]). Logo concept: [SIMPLE ICON DESCRIPTION + wordmark or lettermark]. Establish: which Canva templates best match this aesthetic, and a style guide rule for image selection (photography style, illustration vs. photo, filter/overlay approach)." },
      { title: "Social Media Post Design Brief", useCase: "Social Media", prompt: "Design brief for a [PLATFORM: Instagram/LinkedIn/Facebook] post for [BRAND]. Post type: [QUOTE / ANNOUNCEMENT / PRODUCT SHOWCASE / DATA STAT / EVENT]. Visual direction: [DESCRIBE THE VISUAL CONCEPT]. Text on image: [EXACT TEXT — headline + subtext]. Color palette: [BRAND COLORS]. Visual elements to include: [ICONS, SHAPES, PHOTOS]. Call to action: [CTA TEXT]. Size: [PLATFORM-SPECIFIC DIMENSIONS]. Mood: [ENERGETIC / CALM / PREMIUM / PLAYFUL]." },
      { title: "Presentation Template Design", useCase: "Presentations", prompt: "Design a Canva presentation template for [TYPE: business/educational/creative] on the topic of [TOPIC]. Slides needed: (1) Title slide, (2) Agenda/outline, (3) Content slide (text + image), (4) Full-bleed image slide with text overlay, (5) Data/chart slide, (6) Quote slide, (7) Call to action / closing slide. Color scheme: [COLORS]. Typography: [FONT STYLES]. Visual style: [CLEAN MINIMAL / BOLD GRAPHIC / SOFT ORGANIC / CORPORATE PROFESSIONAL]. Consistent with [BRAND] brand guidelines." }
    ]
  },

  "perplexity-ai": {
    free: [
      { title: "Deep Research Query", useCase: "Research", prompt: "Research [TOPIC] comprehensively and give me: (1) A current, factual overview with the most up-to-date information available, (2) The key debates or disagreements among experts on this topic, (3) Data and statistics (cite specific numbers and sources), (4) The most credible sources for further reading (with URLs), (5) What has changed in the last 12 months, (6) Practical implications for [MY CONTEXT]. Prioritize primary sources and peer-reviewed research over opinion pieces." },
      { title: "Competitive Intelligence Search", useCase: "Business Intelligence", prompt: "Research [COMPANY NAME] for a competitive intelligence report. Find: (1) Recent news and announcements (last 6 months), (2) Funding and financial updates, (3) Product launches or feature releases, (4) Key executive changes, (5) Job postings that signal strategic direction, (6) Customer reviews and sentiment (G2, Trustpilot, Reddit), (7) Technology stack (if available), (8) Marketing positioning (how they describe themselves). Cite all sources." },
      { title: "Fact-Check Request", useCase: "Research Verification", prompt: "Fact-check this claim: '[CLAIM TO VERIFY]'. I need: (1) Is this claim true, false, partially true, or unverifiable?, (2) Evidence supporting the claim (with sources), (3) Evidence against or complicating the claim, (4) Context that changes the meaning of the claim, (5) The most authoritative source on this topic, (6) Any related claims that are commonly confused with this one. Be explicit about what you found vs. what you couldn't verify." }
    ]
  },

  "gemini": {
    free: [
      { title: "Multimodal Analysis Prompt", useCase: "Image + Text Analysis", prompt: "Analyze the attached [IMAGE/SCREENSHOT/DOCUMENT] and provide: (1) A detailed description of what you see, (2) Key insights or patterns you notice, (3) [SPECIFIC ANALYSIS NEEDED: e.g., identify UI/UX issues / extract all data points / assess brand consistency / compare to [REFERENCE]], (4) Recommendations based on your analysis, (5) Any questions you'd ask to provide a more complete analysis. Context: [WHY YOU NEED THIS ANALYSIS]." },
      { title: "Google Workspace Integration Prompt", useCase: "Productivity", prompt: "Help me [TASK] using Google [WORKSPACE TOOL: Docs/Sheets/Slides]. Specifically: [DETAILED TASK DESCRIPTION]. Requirements: (1) [REQUIREMENT 1], (2) [REQUIREMENT 2], (3) [REQUIREMENT 3]. Format: [DESIRED OUTPUT FORMAT]. If applicable, provide the Google Apps Script code to automate this. Also suggest 3 related automation opportunities in [WORKSPACE TOOL] that would save me time." },
      { title: "Long Context Document QA", useCase: "Document Intelligence", prompt: "I'm sharing [DOCUMENT TYPE: research paper/contract/report/book chapter]. Please: (1) Identify the document's core argument or purpose in 2 sentences, (2) Answer these specific questions: [LIST YOUR QUESTIONS], (3) Extract all [DATA TYPE: dates/names/numbers/action items/commitments] and present them in a structured format, (4) Flag any inconsistencies or unclear sections, (5) Provide a comprehensive summary organized by [STRUCTURE: theme/chronology/section]." }
    ]
  },

  "elevenlabs": {
    domain: "elevenlabs.io",
    displayName: "ElevenLabs",
    free: [
      { title: "Voiceover Script for AI Voice", useCase: "Voice Content", prompt: "Write a voiceover script for [PURPOSE: e.g., product explainer / podcast intro / audiobook chapter / e-learning module] to be read by an AI voice. Duration: [X SECONDS/MINUTES]. Tone: [WARM/AUTHORITATIVE/CONVERSATIONAL/NARRATIVE]. Include: natural sentence rhythm (varied sentence lengths), pause indicators [PAUSE], emphasis markers for key words [BOLD/CAPS], phrasing that sounds natural when spoken (not read), and no tongue-twisters or difficult consonant clusters. Avoid: long complex sentences, jargon, abbreviations that don't vocalize well." },
      { title: "Character Voice Design Brief", useCase: "Voice Acting / AI Characters", prompt: "Design the voice character profile for [CHARACTER NAME] for use with AI voice synthesis. Profile: (1) Age and gender, (2) Regional accent or dialect, (3) Vocal quality descriptors (e.g., warm baritone / crisp and energetic / soft and measured), (4) Speaking pace (WPM: slow ~120 / normal ~150 / fast ~180), (5) Emotional range (which emotions this character expresses, and how), (6) Catchphrases or verbal tics, (7) Example sentences that capture the voice, (8) Comparable reference voices (actors, public figures)." },
      { title: "Podcast Ad Read Script", useCase: "Audio Advertising", prompt: "Write a [30/60]-second podcast ad read script for [PRODUCT/SERVICE] to be voiced by an AI voice. Tone: [CONVERSATIONAL, as if the host is recommending it]. Structure: (1) Personal connection opener (2–3 sentences), (2) Product introduction with core benefit, (3) 2 key features framed as listener benefits, (4) Social proof (statistic or review), (5) Offer and promo code, (6) URL / CTA (easy to remember). Mark [PAUSE] after key beats. Emphasize [KEY WORDS]." },
      { title: "Audiobook Narration Style Guide", useCase: "Audiobook Production", prompt: "Create an audiobook narration style guide for [BOOK TITLE] by [AUTHOR] to be recorded with an AI voice clone. Specify: (1) Overall narrative tone (e.g., warm and intimate / dramatic and cinematic), (2) Pacing rules — default WPM and when to slow down (emotional scenes, key revelations) or speed up (action, lists), (3) How to handle dialogue — each named character's voice descriptor, accent, and energy level, (4) Pause lengths: end of chapter [X sec], paragraph breaks [X sec], em-dash pauses [X sec], (5) Pronunciation guide for [UNUSUAL WORDS/NAMES], (6) Chapter intro style (tone reset instructions), (7) Emotional delivery notes for the 3 most intense scenes." },
      { title: "Video Dubbing Script Adaptation", useCase: "Localisation / Dubbing", prompt: "Adapt this [SOURCE LANGUAGE] script for AI voice dubbing into [TARGET LANGUAGE]. Original script: [PASTE SCRIPT WITH TIMECODES]. Requirements: (1) Match lip-sync timing — translated lines must fit within [±0.5 sec] of the original duration (note each line's target duration), (2) Preserve the speaker's tone and intent, not just literal meaning, (3) Use natural spoken [TARGET LANGUAGE] — avoid formal written register, (4) Flag any cultural references that need localisation (with suggested alternatives), (5) Mark emphasis words for the AI voice, (6) Note any lines where phrasing significantly changed meaning and why." }
    ]
  },

  "runway": {
    free: [
      { title: "Video Generation Prompt", useCase: "AI Video Creation", prompt: "[SUBJECT: what is the main subject and what are they doing], [ENVIRONMENT: detailed setting description — location, time of day, weather], [CAMERA MOVEMENT: e.g., slow push-in / pan left / aerial drone shot / handheld], [LIGHTING: e.g., golden hour cinematography / moody blue-tinted studio lighting], [VISUAL STYLE: e.g., cinematic 35mm film / documentary handheld / sci-fi aesthetic], [MOOD AND ATMOSPHERE: e.g., tense and suspenseful / peaceful and serene], [ADDITIONAL VISUAL DETAILS: fog, particles, depth of field]. Duration: [X SECONDS]." },
      { title: "Image-to-Video Motion Brief", useCase: "Animation", prompt: "Transform this image into a video with the following motion: [DESCRIBE EXACTLY WHAT SHOULD MOVE AND HOW: e.g., the character's hair gently blowing left in a breeze / the camera slowly orbits clockwise around the subject / clouds drift slowly across the background]. Static elements: [WHAT SHOULD NOT MOVE]. Duration: [X SECONDS]. Intensity: [subtle/moderate/dramatic motion]. Maintain: consistent lighting, color palette, and the integrity of [KEY ELEMENTS IN THE IMAGE]." },
      { title: "AI Video Style Transfer", useCase: "Video Editing", prompt: "Apply the following visual style to [DESCRIBE SOURCE VIDEO CONTENT]: [TARGET STYLE: e.g., anime / oil painting / noir black and white / cyberpunk neon aesthetic / Studio Ghibli watercolor]. Maintain: the original motion and subject identity. Adjust: color grading to [COLOR PALETTE], texture to [TEXTURE DESCRIPTION], and lighting to [LIGHTING STYLE]. Preserve: faces and key identifying features of subjects. Output quality: [HIGH DETAIL / STYLIZED]." }
    ]
  },

  "heygen": {
    free: [
      { title: "AI Avatar Video Script", useCase: "Video Marketing", prompt: "Write a [X]-minute talking-head video script for an AI avatar representing [BRAND/PERSON]. Topic: [VIDEO TOPIC]. Audience: [TARGET AUDIENCE]. Structure: (1) Open with a direct value statement (what the viewer will learn/get), (2) Core content in 3 short sections, (3) One relatable example or story, (4) Key takeaway or action step, (5) CTA. Language: conversational, clear, jargon-free. Sentence length: short (under 20 words each). Avoid: filler words, complex grammar, anything that sounds unnatural when spoken." },
      { title: "Personalized Outreach Video Script", useCase: "Sales / Recruiting", prompt: "Write a personalized 60-second video script for [SENDER NAME] to send to [RECIPIENT NAME] at [COMPANY] as a [SALES OUTREACH / JOB INTERVIEW THANK YOU / PARTNERSHIP PITCH]. Personalization: reference [SPECIFIC DETAIL ABOUT RECIPIENT: recent news, mutual connection, their LinkedIn post]. Message: [CORE MESSAGE]. CTA: [SPECIFIC NEXT STEP]. Tone: genuine, human, not salesy. Designed to be recorded by an AI avatar using the sender's face/voice clone." },
      { title: "Corporate Training Video Script", useCase: "L&D", prompt: "Write a 3-minute training video script for [TRAINING TOPIC] to be presented by an AI avatar. Audience: [NEW EMPLOYEES / MANAGERS / SPECIFIC ROLE]. Learning objective: [WHAT THEY SHOULD KNOW OR DO AFTER WATCHING]. Include: a scenario-based example, a clear process walkthrough (3 steps), a common mistake to avoid, and a knowledge-check question at the end. Conversational tone, not lecture-style. Include [SLIDE CHANGE] cues for any supporting visuals." }
    ]
  },

  "figma-ai": {
    free: [
      { title: "UI Component Spec", useCase: "Product Design", prompt: "Write a detailed UI component specification for a [COMPONENT NAME: e.g., primary button / search input / navigation bar / modal dialog] in [BRAND]'s design system. Include: component purpose, all variants (size S/M/L, states: default/hover/active/disabled/focus), spacing tokens (padding, margin), color tokens (by state), typography (size, weight, color), icon specifications, border radius, shadow, and interaction behavior. WCAG AA compliance notes. Write as a Figma component specification." },
      { title: "Design Feedback Analysis", useCase: "Design Critique", prompt: "Review this UI design [PASTE DESCRIPTION OR SHARE CONTEXT] and provide structured feedback across: (1) Visual hierarchy — is the user's eye guided correctly?, (2) Spacing and layout consistency, (3) Color and contrast (WCAG AA), (4) Typography system adherence, (5) Interactive affordances (is it clear what's clickable?), (6) Mobile responsiveness considerations, (7) Accessibility gaps, (8) Alignment with [BRAND GUIDELINES]. Prioritize feedback as: Critical / Important / Suggestion." },
      { title: "Design System Token Definition", useCase: "Design Systems", prompt: "Define the design tokens for [BRAND]'s design system. Token categories needed: (1) Color tokens — primitive (raw hex) and semantic (usage-based: color.text.primary, color.background.success, etc.), (2) Typography tokens (font-family, size scale, line-height, weight), (3) Spacing tokens (4px base grid, T-shirt sizes XS→XXL), (4) Border radius tokens, (5) Shadow tokens, (6) Motion tokens (duration, easing). Format as JSON-ready token definitions following the W3C Design Token spec." }
    ]
  },

  "adobe-firefly": {
    free: [
      { title: "Generative Fill Prompt", useCase: "Photo Editing", prompt: "Replace [DESCRIBE ELEMENT TO REMOVE/REPLACE] in this image with: [DETAILED DESCRIPTION OF REPLACEMENT CONTENT]. The new element should: (1) Match the existing lighting ([DESCRIBE LIGHTING: e.g., warm afternoon sunlight from the right]), (2) Match the photographic style ([e.g., shallow depth of field, slightly desaturated editorial style]), (3) Blend seamlessly with the background ([DESCRIBE BACKGROUND]), (4) Match the perspective and scale of surrounding elements. [ADDITIONAL DETAILS: texture, color, mood]." },
      { title: "Text Effects Prompt", useCase: "Typography Design", prompt: "Apply a visual style to the text '[TEXT TO STYLE]'. Style: [DETAILED DESCRIPTION: e.g., the letters are made of intertwined golden vines and flowers, soft studio lighting, against a dark forest green background / neon chrome letters with electric blue glow, cyberpunk aesthetic, dark background]. Font personality: [SERIF/SANS/SCRIPT]. Use for: [E.g., poster headline / logo treatment / social media graphic]. Additional effects: [SHADOWS, REFLECTIONS, PARTICLES, etc.]." },
      { title: "Brand Campaign Image Concept", useCase: "Advertising", prompt: "Create a brand campaign image for [BRAND NAME] promoting [PRODUCT/MESSAGE] with the campaign theme '[CAMPAIGN THEME]'. Visual concept: [DESCRIBE THE SCENE OR CONCEPT]. Brand elements to include: [LOGO PLACEMENT / BRAND COLORS / BRAND MASCOT IF ANY]. Photography or illustration style: [STYLE]. Lighting and color grading: [DESCRIPTION]. Mood: [3 ADJECTIVES]. Target use: [BILLBOARD / SOCIAL MEDIA / PRINT]. Text overlay area: [WHERE TEXT GOES IN THE COMPOSITION — leave clean space for this]." }
    ]
  },

  "suno": {
    free: [
      { title: "Song Generation Prompt", useCase: "Music Creation", prompt: "Generate a [GENRE: e.g., upbeat indie pop / moody lo-fi hip-hop / cinematic orchestral / 90s R&B] song about [THEME/TOPIC]. Lyrics style: [E.g., introspective and poetic / simple and catchy / storytelling narrative]. Structure: Verse - Chorus - Verse - Chorus - Bridge - Chorus. Mood: [MOOD DESCRIPTORS]. Instrumentation: [E.g., acoustic guitar + piano + light percussion / heavy synths + 808s + electric guitar]. Tempo: [SLOW / MID / UPBEAT]. Key: [MAJOR = uplifting / MINOR = emotional]. Reference artists: [ARTIST 1] meets [ARTIST 2]." },
      { title: "Jingle / Brand Music Prompt", useCase: "Brand Audio", prompt: "Create a [X]-second brand jingle for [BRAND NAME] in the [INDUSTRY] industry. The brand is [3 ADJECTIVES: e.g., friendly, innovative, trustworthy]. Genre/style: [E.g., modern pop / classic jingle / electronic / acoustic folk]. Core message to convey: [MESSAGE]. Include the brand name '[BRAND NAME]' sung naturally in the hook. Tone: [WARM / ENERGETIC / SOPHISTICATED]. Use for: [TV ad / app notification / podcast intro / hold music]." },
      { title: "Background Music Prompt", useCase: "Video/Podcast Background Music", prompt: "Create [X-MINUTE] background music for [USE CASE: YouTube video / podcast intro / presentation / product demo / meditation content]. Mood: [MOOD ADJECTIVES]. Genre: [GENRE]. Key characteristics: (1) [E.g., no lyrics — instrumental only], (2) [E.g., builds energy in the second half], (3) [E.g., stays unobtrusive — won't overpower voiceover]. Tempo: [BPM range or slow/mid/upbeat]. Instrumentation: [INSTRUMENTS]. Reference: sounds like [ARTIST/TRACK] but original." }
    ]
  },

  "grammarly": {
    free: [
      { title: "Professional Email Polish", useCase: "Business Writing", prompt: "Rewrite the following email to be clearer, more professional, and more persuasive: [PASTE EMAIL]. Goals: (1) Open with the most important information (BLUF), (2) Remove unnecessary words and filler phrases, (3) Improve sentence variety and flow, (4) Ensure the tone matches [RELATIONSHIP: formal colleague / friendly client / executive leadership], (5) End with a single, clear call to action. Keep the original intent exactly — only improve execution. Then provide a 3-bullet list of the main improvements made." },
      { title: "Content Tone Adjustment", useCase: "Content Editing", prompt: "Rewrite the following content to match this tone: [DESIRED TONE: e.g., authoritative yet approachable / warm and encouraging / punchy and direct / sophisticated and formal]: [PASTE CONTENT]. Maintain: the core message and all key facts. Change: sentence structure, vocabulary level, rhythm, and emotional register. Show me: (1) Original problem areas highlighted, (2) Rewritten version, (3) 5 vocabulary upgrades (old word → new word)." },
      { title: "Academic Writing Improver", useCase: "Academic Writing", prompt: "Improve the academic quality of this writing: [PASTE TEXT]. Specifically: (1) Strengthen the thesis statement, (2) Improve transition sentences between paragraphs, (3) Replace informal language with academic vocabulary, (4) Ensure claims are properly hedged (avoid absolute statements without evidence), (5) Improve sentence variety (mix complex and simple), (6) Identify any logical gaps or unsupported claims. Provide: tracked changes version AND a summary of improvements." }
    ]
  },

  "veed-io": {
    free: [
      { title: "Video Script for Online Course", useCase: "Education / E-Learning", prompt: "Write a [X]-minute lesson script for an online course module titled '[LESSON TITLE]' teaching [TOPIC] to [AUDIENCE]. Structure: (1) Intro hook — tell them exactly what they'll learn (30 sec), (2) Context — why this matters (1 min), (3) Core teaching — broken into 3 clear steps or concepts (each with an example), (4) Common mistake to avoid, (5) Summary and key takeaway, (6) Transition to next lesson or CTA. Conversational teacher voice, not academic. Include [SLIDE/VISUAL] cues in brackets." },
      { title: "Video Repurposing Plan", useCase: "Content Strategy", prompt: "Create a repurposing plan for this [X]-minute [YOUTUBE VIDEO / WEBINAR / PODCAST]: [DESCRIBE CONTENT]. Repurpose into: (1) 3× short clips for TikTok/Reels (identify best moments, write caption for each), (2) LinkedIn post (key insight + 3 bullets + CTA), (3) Blog post outline (H1, 4 H2 sections, conclusion), (4) Email newsletter (150 words + subject line), (5) Quote graphic (best 1-sentence quote), (6) Twitter thread (hook + 5 tweets). Timeline for publishing each repurposed piece." },
      { title: "Subtitle and Caption Style Guide", useCase: "Video Accessibility", prompt: "Write a subtitle and caption style guide for [BRAND]'s video content. Cover: (1) Font choice and size, (2) Color and contrast (WCAG AA), (3) Line length (max characters per line), (4) Display duration (min/max seconds), (5) How to handle speaker changes, (6) How to handle music and sound effects descriptions for deaf/hard of hearing, (7) Punctuation rules, (8) How to handle accents and dialects, (9) Foreign language handling, (10) Placement rules (bottom center default + exceptions)." }
    ]
  },

  "descript": {
    free: [
      { title: "Podcast Episode Summary", useCase: "Podcast Marketing", prompt: "Write marketing materials for a podcast episode titled '[EPISODE TITLE]' featuring [GUEST NAME, TITLE] discussing [TOPIC]. Create: (1) Show notes (400 words: guest bio, 5 key topics covered, 5 timestamped highlights, resources mentioned, 3 key quotes), (2) Email subject line + 2-sentence preview, (3) 3 social media posts (Twitter/X, LinkedIn, Instagram — different angles for each), (4) YouTube description (SEO-optimized, 150 words), (5) 5 clip ideas with timestamps for short-form social content." },
      { title: "Video Podcast Script Outline", useCase: "Video Podcasting", prompt: "Create a structured outline for a [X]-minute video podcast episode on [TOPIC] for [PODCAST NAME]. Include: (1) Pre-show checklist (host and guest prep), (2) Intro script (60 seconds, hooks the audience on the topic), (3) Guest introduction script, (4) Interview arc (5 segments, each 5–8 min with 3 questions per segment), (5) Sponsor break scripts (2 × 60 seconds), (6) Lightning round questions (10 rapid-fire), (7) Outro script with CTAs. Mark natural clip-worthy moments with [CLIP: reason]." },
      { title: "Video Repurposing Workflow", useCase: "Content Production", prompt: "Design a video repurposing workflow for a team producing [X VIDEOS/MONTH] using Descript. Map: (1) Ingestion (file naming, project setup), (2) Transcript cleanup process, (3) 'Remove filler words' settings and review, (4) Clip selection criteria (what makes a great short), (5) Export presets for each platform (YouTube/TikTok/LinkedIn/Instagram), (6) Caption and subtitle export settings, (7) Audio levels standard, (8) Thumbnail extraction process, (9) Team roles (editor / reviewer / publisher), (10) Time estimates per step." }
    ]
  },

  "quillbot": {
    free: [
      { title: "Academic Paraphrase Request", useCase: "Academic Writing", prompt: "Paraphrase the following passage to avoid plagiarism while preserving the original meaning and academic tone: [PASTE PASSAGE]. Requirements: (1) Maintain all factual information and nuance, (2) Use different sentence structures and vocabulary, (3) Keep the academic register appropriate for [FIELD/LEVEL], (4) Do not add or remove information, (5) Preserve any technical terms that have no good synonyms. After the paraphrase, list the 5 most significant wording changes made." },
      { title: "Clarity Rewrite Request", useCase: "Business Writing", prompt: "Rewrite the following text for maximum clarity and conciseness: [PASTE TEXT]. Rules: (1) Cut word count by at least 30% without losing meaning, (2) Replace passive voice with active voice wherever possible, (3) Break any sentence over 25 words into two, (4) Replace jargon with plain language, (5) Use concrete nouns and strong verbs. Show: (1) Rewritten version, (2) Original vs. rewritten word count, (3) A list of 5 cut or simplified elements." },
      { title: "Tone Shift Rewrite", useCase: "Content Adaptation", prompt: "Rewrite the following [CONTENT TYPE] in [TARGET TONE: formal/casual/persuasive/empathetic/authoritative]: [PASTE CONTENT]. Maintain: the core message and all information. Transform: vocabulary level, sentence length, use of personal pronouns, emotional register, and call-to-action style. Provide: (1) Rewritten version in target tone, (2) A 'before vs. after' word/phrase comparison table (10 examples), (3) One sentence describing what changed about the voice." }
    ]
  },

  "surfer-seo": {
    free: [
      { title: "Content Brief from SurferSEO Data", useCase: "SEO Content", prompt: "Using SurferSEO data for the keyword '[TARGET KEYWORD]' (monthly volume: [X], keyword difficulty: [X], content score target: [X]), create an SEO content brief. Include: (1) Recommended title (with keyword naturally included), (2) Meta description (150–160 chars), (3) Target word count, (4) H2 and H3 outline (with keywords to target in each section), (5) Semantically related keywords to weave in naturally (from NLP terms list), (6) Questions to answer from PAA (People Also Ask), (7) Internal links to include, (8) Image and media suggestions." },
      { title: "Content Score Optimization Prompt", useCase: "On-Page SEO", prompt: "Review my article draft for the keyword '[TARGET KEYWORD]' targeting a SurferSEO content score of [TARGET SCORE]. The draft: [PASTE ARTICLE OR SECTIONS]. Optimize by: (1) Suggesting where to naturally add the primary keyword (current density: too low/high/right), (2) Identifying missing NLP terms from [LIST TERMS], (3) Recommending structural changes (add/split/reorder sections), (4) Suggesting additional subheadings that improve topical coverage, (5) Flagging over-optimized phrases. Provide: edited version of weaker sections." },
      { title: "Competitor Content Gap Analysis", useCase: "SEO Strategy", prompt: "Analyze the top 3 ranking articles for '[TARGET KEYWORD]': [DESCRIBE COMPETITOR ARTICLES OR PASTE URLs]. Identify: (1) Topics and subtopics they cover that I'm missing, (2) Unique angles or sections that contribute to their high rankings, (3) Content formats they use (tables, FAQs, lists, tools), (4) Word count comparison, (5) E-E-A-T signals they use (author credentials, sources, original research). Create: a differentiation strategy so my article is demonstrably better than the current top rankers." }
    ]
  },

  "stable-diffusion": {
    free: [
      { title: "High-Quality Image Prompt", useCase: "AI Image Generation", prompt: "[MAIN SUBJECT], [ACTION OR STATE], [DETAILED ENVIRONMENT], [LIGHTING: e.g., dramatic chiaroscuro lighting / soft diffused natural light / neon glow], [ART STYLE: e.g., hyperrealistic digital art / impressionist oil painting / anime illustration / photorealistic], [QUALITY MODIFIERS: masterpiece, best quality, ultra-detailed, sharp focus, 8K resolution], [ADDITIONAL STYLE: e.g., trending on ArtStation, concept art, professional photograph]. Negative prompt: [BAD HANDS, LOW QUALITY, BLURRY, DEFORMED, WATERMARK, TEXT]." },
      { title: "ControlNet Pose + Style Prompt", useCase: "Controlled Generation", prompt: "Using ControlNet [POSE/DEPTH/EDGE] control: [DESCRIBE THE POSE OR STRUCTURE TO CONTROL]. Subject: [SUBJECT DESCRIPTION]. Style: [DETAILED ART STYLE: e.g., Studio Ghibli animation style / Marvel comic book art / Renaissance oil painting]. Lighting: [LIGHTING TYPE]. Background: [BACKGROUND DESCRIPTION]. Additional quality: masterpiece, best quality, ultra-detailed, [SPECIFIC STYLE TAGS]. Negative: [QUALITY NEGATIVES + any style elements to avoid]. Denoising strength: [0.5–0.7 for structure preservation]." },
      { title: "Inpainting Replacement Prompt", useCase: "Image Editing", prompt: "Inpainting the masked area with: [EXTREMELY DETAILED DESCRIPTION OF WHAT TO PLACE IN THE MASKED AREA]. The replacement should: (1) Match the photographic style of the original ([DESCRIBE ORIGINAL STYLE]), (2) Match the lighting ([DESCRIBE LIGHTING]), (3) Match the perspective and scale, (4) Blend seamlessly at the mask edges. Keep: everything outside the mask identical. Additional quality modifiers: [QUALITY TAGS]. Denoising strength: 0.8. Steps: 30+. Sampler: DPM++ 2M Karras." }
    ]
  },

  "kling-ai": {
    free: [
      { title: "AI Video Scene Prompt", useCase: "AI Video Generation", prompt: "Scene: [DETAILED SCENE DESCRIPTION — who, what, where]. Camera: [CAMERA MOVEMENT AND ANGLE: e.g., smooth dolly forward / slow aerial descent / static medium shot]. Subject motion: [EXACTLY HOW SUBJECTS/ELEMENTS MOVE: e.g., a woman walks slowly from left to right, her dress flowing in the wind]. Environment: [TIME OF DAY, WEATHER, ATMOSPHERE]. Visual style: [CINEMATIC STYLE: e.g., filmic color grade with warm tones / cold blue documentary style]. Duration: [X SECONDS]. Additional: [SPECIFIC VISUAL DETAILS]." },
      { title: "Character Animation Prompt", useCase: "Character Video", prompt: "Animate [CHARACTER DESCRIPTION] performing the following action: [DETAILED ACTION DESCRIPTION: e.g., a young woman laughs warmly, tilts her head slightly to the right, then makes eye contact with the camera]. Setting: [BACKGROUND DESCRIPTION]. Lighting: [LIGHTING TYPE]. Camera: [CAMERA FRAMING: e.g., medium close-up, steady]. Motion quality: fluid, natural, realistic. Duration: [X SECONDS]. Maintain: consistent character appearance, natural micro-movements (breathing, subtle eye movement)." },
      { title: "Product in Motion Prompt", useCase: "Commercial Video", prompt: "Create a [X]-second product showcase video for [PRODUCT NAME/DESCRIPTION]. Motion: [HOW THE PRODUCT MOVES: e.g., slowly rotates 360° / is placed on the surface by invisible hands / transforms from flat components to assembled form]. Background: [SURFACE AND ENVIRONMENT: e.g., floating above a clean white gradient surface with soft shadow below]. Lighting: [STUDIO LIGHTING TYPE]. Camera: [SHOT TYPE AND MOVEMENT]. Style: [HIGH-END COMMERCIAL / MINIMAL TECH / LUXURY BRAND]. End frame: [STATIC HERO SHOT DESCRIPTION]." }
    ]
  },

  "neuronwriter": {
    domain: "neuronwriter.com",
    displayName: "NeuronWriter",
    free: [
      { title: "SEO Content Brief from NeuronWriter", useCase: "SEO Content Strategy", prompt: "Using NeuronWriter data for the keyword '[TARGET KEYWORD]' (NLP score target: [X], word count: [X]), create a detailed SEO content brief. Include: (1) Article title with primary keyword naturally placed, (2) Meta description (155 chars), (3) H2/H3 structure with NLP terms assigned to each section, (4) Recommended word count per section, (5) Internal linking opportunities, (6) Questions to answer (PAA-style), (7) Featured snippet target format (paragraph / list / table), (8) Tone and angle that differentiates from the top 3 ranking pages." },
      { title: "NLP Terms Integration Plan", useCase: "On-Page SEO Optimization", prompt: "I'm writing an article targeting '[TARGET KEYWORD]'. My NeuronWriter NLP terms list is: [PASTE TERMS LIST]. Create an integration plan: (1) Group the terms into natural topic clusters, (2) Assign each cluster to a specific article section (H2/H3), (3) Suggest the ideal usage frequency for the top 10 terms, (4) Write 2–3 example sentences for each cluster showing how to use the terms naturally (not keyword-stuffed), (5) Flag any terms that are risky to over-use (topic drift), (6) Identify which terms help answer search intent vs. which are supporting context." },
      { title: "Competitor Content Gap Analysis", useCase: "Content Strategy", prompt: "Analyze my top 3 SERP competitors for '[TARGET KEYWORD]' based on this NeuronWriter data: [DESCRIBE OR PASTE DATA]. Identify: (1) Topics and subtopics they all cover that I'm missing, (2) Unique angles one competitor uses that others don't, (3) Content formats that dominate (listicles, how-tos, comparison tables, FAQs), (4) Estimated word count ranges, (5) E-E-A-T signals they use (credentials, original data, expert quotes), (6) My differentiation opportunity — what would make my article demonstrably better? Output a 'Content Differentiation Strategy' section I can add to my brief." },
      { title: "Content Refresh Plan for Existing Article", useCase: "Content Updating", prompt: "I have an existing article on '[TOPIC]' that has dropped in rankings. Using NeuronWriter, I identified these gaps: [PASTE NEURONWRITER RECOMMENDATIONS]. Create a content refresh plan: (1) Section-by-section audit (keep / update / expand / delete), (2) New NLP terms to add and where, (3) Outdated information to replace (identify placeholder topics), (4) New sections to add based on current SERP trends, (5) Internal linking improvements, (6) Title and meta description update options (3 variations each), (7) Estimated effort (hours) and expected ranking impact. Prioritize changes by impact vs. effort." },
      { title: "Topical Authority Cluster Plan", useCase: "SEO Content Architecture", prompt: "Help me build topical authority for '[MAIN TOPIC]' using NeuronWriter. Pillar page keyword: '[PILLAR KEYWORD]'. Design: (1) Pillar page outline (covering the topic comprehensively — all major subtopics), (2) 8–10 cluster article topics with their target keywords, (3) For each cluster: target NLP terms, search intent, ideal content format, (4) Internal linking map (pillar ↔ cluster relationships), (5) Content production order (start with what builds the most authority fastest), (6) Competitive difficulty assessment for each cluster keyword, (7) Estimated months to rank for the pillar given this strategy." }
    ]
  },

  "beehiiv": {
    domain: "beehiiv.com",
    displayName: "Beehiiv",
    free: [
      { title: "Newsletter Welcome Sequence", useCase: "Subscriber Onboarding", prompt: "Write a 3-email welcome sequence for new subscribers of [NEWSLETTER NAME], a newsletter about [TOPIC] for [AUDIENCE]. Email 1 (immediate): Welcome + set expectations (frequency, content, what they'll get), deliver any lead magnet [LEAD MAGNET IF ANY], tone: [TONE]. Email 2 (day 3): Your origin story — why you started this newsletter + your biggest belief about [TOPIC]. Email 3 (day 7): Your best content ever — curate your top 3 past issues with a 1-sentence hook for each + CTA to reply with their biggest challenge. Subject lines for each: write 3 options. Each email: under 300 words, conversational, ends with one clear next step." },
      { title: "Newsletter Issue Structure", useCase: "Content Creation", prompt: "Write a complete newsletter issue for [NEWSLETTER NAME] on the topic: '[THIS WEEK'S TOPIC]'. Format: (1) Subject line (3 options — curiosity / benefit / controversy), (2) Preview text (90 chars), (3) Opening hook (2–3 sentences that make them need to keep reading), (4) Main story / insight (400–500 words — include one data point, one example, one surprising angle), (5) Practical takeaway (3 bullet points they can use today), (6) Reader question or poll, (7) Closing CTA (reply / share / upgrade to paid). Tone: [CONVERSATIONAL / AUTHORITATIVE / WITTY]. Audience: [AUDIENCE DESCRIPTION]." },
      { title: "Paid Newsletter Upgrade Email", useCase: "Monetisation", prompt: "Write a compelling upgrade email for [NEWSLETTER NAME] to convert free subscribers to a paid [PLAN NAME] at [$X/month]. Subscriber base: [X] free subscribers. Paid benefits: [LIST 3–5 BENEFITS]. Write: (1) Subject line (3 options), (2) Email body (under 400 words): open with a relatable pain point, show the transformation they'll get with paid access, social proof (subscriber quote or stat), address the #1 objection ([OBJECTION]), present the offer clearly, urgency element (if any), single CTA button. Tone: [TONE]. Do not use hype or pushy sales language — make it feel like a genuine invitation." },
      { title: "Subscriber Growth Strategy", useCase: "Newsletter Growth", prompt: "Create a 90-day subscriber growth plan for [NEWSLETTER NAME] to grow from [CURRENT SUBS] to [TARGET SUBS]. Current growth channels: [LIST]. Budget: [FREE / $X/month]. Plan: (1) Top 3 growth levers ranked by effort/impact, (2) Weekly content strategy (what to post where to drive sign-ups), (3) Referral program setup using Beehiiv's built-in referral feature (reward tiers, messaging), (4) Cross-promotion opportunities (other newsletters to partner with — how to pitch them), (5) Lead magnet ideas (3 specific ideas for this niche), (6) Landing page copy improvements (headline + 3 bullet benefits + CTA), (7) 90-day milestones with weekly targets." },
      { title: "Re-engagement Campaign for Inactive Subscribers", useCase: "List Health", prompt: "Write a 2-email re-engagement campaign for inactive [NEWSLETTER NAME] subscribers (haven't opened in [X days/weeks]). Goal: win them back or cleanly remove them to protect deliverability. Email 1 — The 'We Miss You': subject line (3 options), 150-word email acknowledging their absence, reminding them of the value, asking if they still want to receive it, one CTA (stay subscribed button or link). Email 2 — The Last Chance (sent 5 days later to non-openers): subject line (3 urgency options), 100-word farewell email, final CTA, unsubscribe option clearly visible. Also write: the segment criteria to identify these subscribers in Beehiiv, and a note on the ideal send time." }
    ]
  },

  "taskade-ai": {
    domain: "taskade.com",
    displayName: "Taskade AI",
    free: [
      { title: "Project Kickoff Document", useCase: "Project Management", prompt: "Create a complete project kickoff document for [PROJECT NAME] using Taskade. Project goal: [GOAL]. Team: [LIST ROLES]. Timeline: [START DATE] to [END DATE]. Deliverables: [LIST]. Include: (1) Project summary (3 sentences), (2) SMART success criteria, (3) Work breakdown structure (phases → milestones → tasks with owner and due date), (4) Risk register (top 5 risks, likelihood 1–5, impact 1–5, mitigation), (5) Communication plan (standup cadence, async update format, escalation path), (6) Decision log template, (7) Definition of done. Format as a structured Taskade outline ready to import." },
      { title: "Weekly Team Review & Planning", useCase: "Team Productivity", prompt: "Create a weekly team review and planning template for [TEAM NAME] in Taskade. For the review (Friday async): (1) What did we complete this week? (each person lists 3 wins), (2) What didn't get done and why?, (3) One blocker or risk to flag, (4) One process improvement suggestion. For the planning (Monday sync): (1) Top 3 priorities this week (team level), (2) Each person's top 3 tasks (owner + due date), (3) Dependencies between tasks, (4) Anything that needs a decision from leadership. Also write: the Taskade AI prompt to use inside the workspace to auto-generate this week's agenda from last week's task data." },
      { title: "Goal Breakdown with Taskade AI", useCase: "Goal Setting", prompt: "Break down this goal into an actionable Taskade project: '[YOUR GOAL]'. Timeline: [X WEEKS/MONTHS]. Use this framework: (1) Outcome definition — what does success look like exactly? (measurable), (2) Phase breakdown (3–4 phases, each 2–4 weeks), (3) Milestones for each phase, (4) Weekly tasks to hit each milestone, (5) Daily habits or recurring tasks that support the goal, (6) Progress metrics to track weekly, (7) Taskade AI agent instructions — write the prompt to configure a Taskade AI agent that checks in on my progress, asks accountability questions, and suggests next steps. Format as a complete nested outline." },
      { title: "Client Onboarding Workflow", useCase: "Client Management", prompt: "Build a reusable client onboarding workflow in Taskade for [YOUR SERVICE TYPE]. Client info: [TYPE OF CLIENT]. Onboarding duration: [X DAYS]. Create: (1) Onboarding checklist (categorised by: internal tasks / client actions / shared deliverables), (2) Timeline with specific day-by-day tasks for the first 14 days, (3) Client welcome message template, (4) Kickoff call agenda, (5) Access and credentials handover checklist, (6) First-week check-in email template, (7) Milestone sign-off template. Also write: the Taskade AI prompt to generate a custom onboarding plan when given a new client's name, service tier, and start date." },
      { title: "Brainstorming Session with AI Agent", useCase: "Ideation & Strategy", prompt: "Run a structured brainstorming session in Taskade AI for [TOPIC/PROBLEM]. Setup: (1) Write the Taskade AI agent system prompt to act as a [ROLE: e.g., creative strategist / product manager / marketing expert] for this session. (2) Opening prompt to generate 20 diverse ideas (include: conventional ideas, contrarian ideas, ideas that borrow from other industries). (3) Prompts to expand the top 3 ideas: force a second-order consequence analysis, identify the biggest risk for each, and suggest a 30-day MVP to test each. (4) A prioritisation framework prompt (score by: impact, feasibility, speed to market). (5) Output format for the final ideas document in Taskade (nested outline with idea → rationale → risks → next step)." }
    ]
  },

  "fireflies-ai": {
    domain: "fireflies.ai",
    displayName: "Fireflies.ai",
    free: [
      { title: "Meeting Summary & Key Decisions", useCase: "Meeting Productivity", prompt: "Using my Fireflies.ai transcript from [MEETING NAME / DATE], generate a structured meeting summary. Include: (1) Meeting purpose in one sentence, (2) Attendees and their roles, (3) Key decisions made (bulleted list), (4) Problems raised and proposed solutions, (5) Open questions that were left unresolved, (6) Next steps agreed upon (with owner and due date if mentioned), (7) Any commitments made by specific people. Keep the summary under 400 words. Highlight any decisions that require follow-up from me specifically: [YOUR NAME/ROLE]." },
      { title: "Action Item Extraction", useCase: "Task Management", prompt: "Extract all action items from this Fireflies.ai meeting transcript: [PASTE TRANSCRIPT OR SUMMARY]. For each action item provide: (1) Task description (clear and specific), (2) Owner (person responsible), (3) Due date or timeframe (if mentioned), (4) Priority (High / Medium / Low based on context), (5) Dependencies (what needs to happen first). Format as a table. Then write a Slack/Teams message I can send to the team listing all action items clearly. Flag any tasks assigned to me: [YOUR NAME]." },
      { title: "Follow-Up Email from Meeting", useCase: "Communication", prompt: "Based on this Fireflies.ai meeting transcript/summary: [PASTE CONTENT], draft a professional follow-up email to send to all attendees. Include: (1) Brief thank-you and meeting recap (2 sentences), (2) Decisions made (bulleted), (3) Action items table (person → task → deadline), (4) Next meeting date/time if scheduled, (5) Any documents or resources shared during the meeting (with links if available). Tone: [FORMAL / FRIENDLY / DIRECT]. Send from: [YOUR NAME, TITLE]. Recipients: [LIST ATTENDEES]." },
      { title: "Sales Call Debrief & Coaching Notes", useCase: "Sales Enablement", prompt: "Analyze this Fireflies.ai sales call transcript: [PASTE TRANSCRIPT]. Provide: (1) Deal stage assessment — where is this prospect in the buying journey?, (2) Pain points identified (explicit + implied), (3) Objections raised and how they were handled (rate each response: strong / adequate / missed), (4) Buying signals or red flags, (5) Competitor mentions and context, (6) Next steps agreed — are they specific and time-bound?, (7) 3 coaching recommendations for the rep, (8) Suggested follow-up email subject line and opening line. Rate the overall call quality 1–10 with rationale." },
      { title: "Interview Notes & Candidate Debrief", useCase: "Recruiting", prompt: "Using this Fireflies.ai interview transcript for [ROLE] candidate [CANDIDATE NAME]: [PASTE TRANSCRIPT]. Generate: (1) Structured debrief notes (2 pages max): technical skills demonstrated, soft skills observed, culture fit signals, (2) Evidence-based scoring on each of these competencies: [LIST 4–6 COMPETENCIES] — rate 1–5 with specific quotes from the transcript as evidence, (3) Green flags (3 strongest positives with quotes), (4) Concerns or gaps (2–3 with supporting evidence), (5) Suggested follow-up questions for the next interview round, (6) Hire / No hire / Maybe recommendation with one-paragraph rationale." }
    ]
  },

  "reclaim-ai": {
    domain: "reclaim.ai",
    displayName: "Reclaim AI",
    free: [
      { title: "Weekly Schedule Optimization Plan", useCase: "Time Management", prompt: "Help me optimize my schedule using Reclaim AI principles. My current situation: (1) Working hours: [e.g., 9am–6pm Mon–Fri], (2) Recurring commitments: [LIST FIXED MEETINGS], (3) Deep work needs: [e.g., 2 hours/day for [PROJECT]], (4) Admin tasks: [e.g., email, Slack — roughly X hours/week], (5) Personal habits to protect: [e.g., lunch, gym, school pickup]. Goals: maximize deep focus blocks, minimize context-switching, protect personal time. Provide: an ideal weekly schedule template and the top 3 Reclaim AI task categories I should set up first." },
      { title: "Focus Block Strategy", useCase: "Deep Work", prompt: "Design a focus block strategy for my role as [YOUR ROLE] at [TYPE OF COMPANY]. I need to complete [TYPE OF DEEP WORK: e.g., writing, coding, analysis] for [X hours/week]. My biggest scheduling challenges are: [e.g., back-to-back meetings / constant interruptions / unclear priorities]. Using Reclaim AI's smart scheduling: (1) What focus block duration and frequency should I target?, (2) What times of day are ideal for deep work for [MORNING PERSON / EVENING PERSON]?, (3) How should I handle meeting requests that conflict with focus blocks?, (4) What buffer time should I schedule between meetings?" },
      { title: "Meeting Load Audit & Reduction Plan", useCase: "Meeting Management", prompt: "Audit my current meeting load and help me reduce it using Reclaim AI. My current meetings: [LIST RECURRING MEETINGS WITH FREQUENCY AND DURATION]. Total meeting time per week: [X HOURS]. Role: [YOUR ROLE]. For each meeting category, assess: (1) Is this meeting necessary or could it be async?, (2) Could it be shorter? (3) Could frequency be reduced? Then: (4) Suggest which meetings to convert to async updates, (5) Recommend ideal meeting-free days/time blocks to protect, (6) Draft a message to my team explaining my new scheduling boundaries." },
      { title: "Personal Habits & Energy Protection Plan", useCase: "Work-Life Balance", prompt: "Help me build a habit protection strategy using Reclaim AI's scheduling. My non-negotiable personal habits: [LIST: e.g., morning workout 6–7am, lunch break 12–1pm, school pickup 3:30pm, no-meeting Fridays]. My work role: [ROLE]. Company calendar culture: [e.g., lots of last-minute meeting requests / back-to-back days are common]. Design: (1) Which habits to protect as hard blocks in Reclaim AI (no meetings allowed), (2) Which to set as soft/flexible blocks, (3) Buffer time to add around each habit, (4) An out-of-office message template for declined invites that fall on protected blocks, (5) A 2-week experiment plan to test the new calendar setup." },
      { title: "Team Async-First Calendar Audit", useCase: "Team Productivity", prompt: "Conduct an async-first calendar audit for my team of [X PEOPLE] at [COMPANY TYPE]. Team roles: [LIST ROLES]. Current meeting load per person per week: [AVERAGE HOURS]. Using Reclaim AI for team scheduling, recommend: (1) Shared no-meeting windows (deep work zones for the whole team), (2) Meetings that should be eliminated and replaced with async alternatives (Loom / Notion / Slack), (3) Which 1:1s can become bi-weekly instead of weekly, (4) Optimal windows for the weekly team sync (protect everyone's deep work peaks), (5) A Reclaim AI team habit setup: shared focus hours, lunch blocks, EOD buffers, (6) A rollout message to send the team explaining the new async-first norms." }
    ]
  }

};

// All batches complete
window._PROMPTS_DATA_COMPLETE = true;





