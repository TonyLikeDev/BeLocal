// AI Chat helper using Groq API (free tier)
// Get your free API key at: https://console.groq.com/

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a helpful AI assistant for BeLocal, a platform that helps travelers discover local experiences in Vietnam. 

You can help users with three main features:
1. 🤖 Discover Experiences with AI - Help users find activities, tours, and experiences
2. 🗺️ Get Local Recommendations by Location - Provide recommendations based on specific locations
3. 💬 Chat with an AI Local Guide - Answer questions about local culture, food, places, and travel tips

Be friendly, concise, and helpful. If users ask about experiences, locations, or need recommendations, provide specific and useful information about Vietnam.`;

export async function getAIResponse(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  // If no API key, use fallback responses
  if (!GROQ_API_KEY) {
    return getFallbackResponse(userMessage);
  }

  try {
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user' as const, content: userMessage },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Free, fast model
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    console.error('AI API error:', error);
    return getFallbackResponse(userMessage);
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Help command
  if (lowerMessage.includes('help')) {
    return `Absolutely! I can help you in different ways - what would you like to use today?

🤖 Discover Experiences with AI
🗺️ Get Local Recommendations by Location
💬 Chat with an AI Local Guide

👉 Just type the feature you want to try!`;
  }

  // Experience-related queries
  if (lowerMessage.includes('experience') || lowerMessage.includes('activity') || lowerMessage.includes('tour')) {
    return `Great! I can help you discover amazing experiences in Vietnam! 🇻🇳

Here are some popular types of experiences:
• 🏖️ Beach activities and water sports
• 🏛️ Cultural tours and historical sites
• 🍜 Food tours and cooking classes
• 🏔️ Adventure activities and hiking
• 🎨 Art and craft workshops

What type of experience are you looking for? Or tell me which city you're interested in!`;
  }

  // Location-based queries
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('place')) {
    return `I'd love to help you find great places! 🗺️

I can recommend:
• 🍽️ Best local restaurants and street food
• 🏨 Accommodations and hotels
• 🎯 Must-visit attractions
• 🛍️ Shopping areas and markets
• 🌃 Nightlife spots

Which city or area are you interested in? (e.g., Ho Chi Minh City, Hanoi, Da Nang, Hoi An)`;
  }

  // Food-related queries
  if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant') || lowerMessage.includes('cuisine')) {
    return `Vietnamese cuisine is amazing! 🍜

I can help you discover:
• 🍲 Traditional dishes (phở, bánh mì, spring rolls)
• 🍜 Regional specialties
• 🥢 Street food recommendations
• 🍽️ Best restaurants by area
• 👨‍🍳 Cooking classes

What would you like to know about Vietnamese food?`;
  }

  // Travel/tourist questions
  if (lowerMessage.includes('travel') || lowerMessage.includes('visit') || lowerMessage.includes('tourist')) {
    return `Welcome to Vietnam! 🇻🇳

I can help you plan your trip with:
• 📍 Top destinations and attractions
• 🚗 Transportation tips
• 💰 Budget recommendations
• 📅 Best times to visit
• 🎒 Travel tips and cultural insights

What would you like to know?`;
  }

  // Default response
  return `I'm here to help you discover amazing experiences in Vietnam! 🇻🇳

You can ask me about:
• 🎯 Activities and experiences
• 🗺️ Location-based recommendations  
• 🍜 Food and restaurants
• 📍 Travel tips and places to visit
• 💬 Anything about Vietnam!

Or type "help" to see all available features.`;
}

