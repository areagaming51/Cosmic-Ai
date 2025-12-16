
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInputs, AnalysisResult } from "../types";

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    rootNumber: { type: Type.INTEGER, description: "Numerology root number" },
    sunSign: { type: Type.STRING, description: "Western Zodiac Sun Sign" },
    moonSign: { type: Type.STRING, description: "Vedic Moon Sign (Rashi)" },
    nakshatra: { type: Type.STRING, description: "Vedic Nakshatra" },
    basicSummary: { type: Type.STRING, description: "A short, clear 2-sentence summary of who they are." },
    animalPersona: {
      type: Type.OBJECT,
      properties: {
        animal: { type: Type.STRING, description: "Name of the spirit animal" },
        emoji: { type: Type.STRING, description: "Emoji" },
        description: { type: Type.STRING, description: "One simple sentence explaining why." }
      },
      required: ["animal", "emoji", "description"]
    },
    pokemonPersona: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Name of the Pokemon" },
        type: { type: Type.STRING, description: "Type" },
        description: { type: Type.STRING, description: "Simple explanation of the match." }
      },
      required: ["name", "type", "description"]
    },
    weeklyForecast: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Current week range" },
        dos: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 simple actions to take" },
        avoids: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 simple things to avoid" }
      },
      required: ["title", "dos", "avoids"]
    },
    personality: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 concise personality traits." 
    },
    loveMarriage: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 simple points on relationships." 
    },
    careerMoney: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 simple points on career." 
    },
    health: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 simple points on health." 
    },
    areasToAvoid: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3 simple pitfalls." 
    },
    strengthBoosters: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3 simple skills to build." 
    },
    luckyElements: {
      type: Type.OBJECT,
      properties: {
        colors: { type: Type.STRING },
        numbers: { type: Type.STRING },
        direction: { type: Type.STRING },
        deityOrMantra: { type: Type.STRING }
      },
      required: ["colors", "numbers", "direction", "deityOrMantra"]
    },
    practicalTips: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "3-4 easy lifestyle tips." 
    },
    lifeBalanceScores: {
      type: Type.OBJECT,
      properties: {
        love: { type: Type.INTEGER },
        career: { type: Type.INTEGER },
        health: { type: Type.INTEGER },
        family: { type: Type.INTEGER },
        spirituality: { type: Type.INTEGER }
      },
      required: ["love", "career", "health", "family", "spirituality"]
    },
    luckyDays: {
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "List 2 favorable days."
    },
    festivalInsights: {
      type: Type.STRING,
      description: "One sentence connecting to a current event or festival."
    },
    compatibilityReport: {
      type: Type.OBJECT,
      properties: {
        overallScore: { type: Type.INTEGER, description: "0-100 Score" },
        loveLevel: { type: Type.STRING, description: "Simple title e.g. 'Great Match'" },
        elementalVibe: { type: Type.STRING, description: "e.g. 'Fire and Water'" },
        relationshipDynamic: { type: Type.STRING, description: "Clear description of how they get along." },
        communicationStyle: { type: Type.STRING, description: "How they talk." },
        communicationTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 tips." },
        challengesToAvoid: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 pitfalls." },
        sexualChemistry: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 brief points on intimacy." },
        financialCompatibility: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 brief points on finances." },
        coupleWeeklyForecast: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            dos: { type: Type.ARRAY, items: { type: Type.STRING } },
            avoids: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "dos", "avoids"]
        },
        relationshipBalance: {
          type: Type.OBJECT,
          properties: {
             intimacy: { type: Type.INTEGER },
             trust: { type: Type.INTEGER },
             communication: { type: Type.INTEGER },
             fun: { type: Type.INTEGER },
             growth: { type: Type.INTEGER }
          },
          required: ["intimacy", "trust", "communication", "fun", "growth"]
        },
        sharedLuckyElements: {
          type: Type.OBJECT,
          properties: {
            colors: { type: Type.STRING },
            numbers: { type: Type.STRING },
            places: { type: Type.STRING },
            activities: { type: Type.STRING }
          },
          required: ["colors", "numbers", "places", "activities"]
        },
        auspiciousMilestones: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    event: { type: Type.STRING },
                    period: { type: Type.STRING },
                    description: { type: Type.STRING }
                }
            },
            description: "3 future milestones."
        }
      },
      nullable: true
    },
    decisionAnalysis: {
      type: Type.OBJECT,
      properties: {
        moonPhase: { type: Type.STRING, description: "Current Moon Phase" },
        nakshatra: { type: Type.STRING, description: "Current Moon Nakshatra" },
        score: { type: Type.INTEGER, description: "Readiness score 0-100" },
        verdict: { type: Type.STRING, enum: ["Green", "Yellow", "Red"] },
        reasoning: { type: Type.STRING, description: "2-3 short lines explaining why" },
        bestAction: { type: Type.STRING, description: "Proceed / Delay / Prepare only" },
        timingTip: { type: Type.STRING, description: "Short timing tip" },
        riskNote: { type: Type.STRING, description: "One caution" },
        disclaimer: { type: Type.STRING, description: "Strict disclaimer text" }
      },
      nullable: true
    }
  },
  required: [
    "rootNumber", "sunSign", "moonSign", "nakshatra", "basicSummary", "animalPersona", "pokemonPersona", "weeklyForecast",
    "personality", "loveMarriage", "careerMoney", "health", 
    "areasToAvoid", "strengthBoosters", "luckyElements", "practicalTips",
    "lifeBalanceScores", "luckyDays", "festivalInsights"
  ]
};

const LANG_PROMPTS: Record<string, string> = {
  en: "OUTPUT LANGUAGE: ENGLISH. Use simple, clear, modern English. Avoid archaic, overly mystical, or complex words. Explain any Sanskrit terms simply.",
  hi: "OUTPUT LANGUAGE: HINDI (Devanagari). Use simple, conversational Hindi. Translate all content values.",
  es: "OUTPUT LANGUAGE: SPANISH. Use simple, modern Spanish.",
  fr: "OUTPUT LANGUAGE: FRENCH. Use simple, modern French.",
  de: "OUTPUT LANGUAGE: GERMAN. Use simple, modern German.",
  ja: "OUTPUT LANGUAGE: JAPANESE. Use natural, modern Japanese."
};

export const generateAstrologyInsights = async (inputs: UserInputs): Promise<AnalysisResult> => {
  // Directly use process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const isCompatibility = inputs.mode === 'compatibility';
  const isDecision = inputs.mode === 'decision';
  
  const primaryLifestyle = inputs.primaryLifestyle ? inputs.primaryLifestyle : "Not specified";
  const secondaryLifestyle = inputs.secondaryLifestyle ? inputs.secondaryLifestyle : "Not specified";
  const language = inputs.language || 'en';
  const today = new Date().toDateString();

  const langInstruction = LANG_PROMPTS[language] || LANG_PROMPTS['en'];

  let prompt = `
    Role: You are a friendly, modern Astrologer. You explain complex cosmic ideas in simple, easy-to-understand language.
    
    Current Date: ${today}.
    ${langInstruction}
  `;

  if (isDecision) {
    prompt += `
    MODE: DECISION READINESS (COSMIC COMPASS)
    
    You are an assistant in Cosmic.AI.
    Your job is to explain decision readiness, not predict outcomes.

    Hard Rules:
    - Do not predict future results
    - Do not give financial, legal, or medical advice
    - Use calm, practical language
    - Frame everything as timing and preparedness, not fate.
    - Max 100 words for the explanation.
    
    USER:
    - DOB: ${inputs.dob}
    - Time/Place: ${inputs.timeOfBirth || "Unknown"}, ${inputs.placeOfBirth || "Unknown"}
    
    DECISION CONTEXT:
    - Category: ${inputs.decisionCategory}
    - Urgency: ${inputs.decisionUrgency}
    - Question/Context: ${inputs.decisionContext || "General Guidance"}
    
    INSTRUCTIONS:
    1. Calculate the user's Root Number, Sun Sign, Moon Sign, and current astrological transits (Tara Bala / Chandra Bala) for today.
    2. Determine a "Readiness Score" (0-100) based on the alignment of the current Moon Phase, Nakshatra, and the user's chart relative to the decision category.
    3. Fill the 'decisionAnalysis' object strictly.
       - Verdict: 'Green' (Go), 'Yellow' (Caution), 'Red' (Stop/Wait).
       - Best Action: strictly "Proceed", "Delay", or "Prepare".
       - Disclaimer: "This guidance is for reflection and planning only. Not professional advice."
    4. Fill the standard fields (rootNumber, sunSign, etc.) as well for context.
    5. 'compatibilityReport' must be null.
    `;
  } else if (isCompatibility) {
    prompt += `
    MODE: RELATIONSHIP COMPATIBILITY
    
    PARTNER A (Main User):
    - DOB: ${inputs.dob}
    - Gender: ${inputs.gender}
    - Time/Place: ${inputs.timeOfBirth || "Unknown"}, ${inputs.placeOfBirth || "Unknown"}
    
    PARTNER B:
    - DOB: ${inputs.partnerDob}
    - Gender: ${inputs.partnerGender}
    - Time/Place: ${inputs.partnerTimeOfBirth || "Unknown"}, ${inputs.partnerPlaceOfBirth || "Unknown"}
    
    INSTRUCTIONS:
    1. Calculate Western Sun Sign AND Vedic Moon Sign for BOTH.
    2. IMPORTANT: Fill the root level fields (sunSign, moonSign, etc.) with PARTNER A's details to satisfy schema.
    3. Fill 'compatibilityReport' completely including 'coupleWeeklyForecast', 'relationshipBalance', and 'sharedLuckyElements'.
    4. 'relationshipDynamic': Explain it like you are talking to a friend.
    5. 'decisionAnalysis' must be null.
    `;
  } else {
    prompt += `
    MODE: INDIVIDUAL ANALYSIS
    
    USER:
    - DOB: ${inputs.dob}
    - Gender: ${inputs.gender}
    - Time/Place: ${inputs.timeOfBirth || "Unknown"}, ${inputs.placeOfBirth || "Unknown"}
    - Lifestyle: ${primaryLifestyle}, ${secondaryLifestyle}
    
    INSTRUCTIONS:
    - Calculate Root Number, Western Sun Sign, Vedic Moon Sign, and Nakshatra.
    - 'compatibilityReport' must be null.
    - 'decisionAnalysis' must be null.
    - Focus on practical, real-life advice (Career, Peace, Growth).
    - Avoid "doom and gloom". Be positive and helpful.
    `;
  }

  prompt += `
    Return strictly JSON matching the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
        temperature: 0.7, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from the stars.");
    
    let result: AnalysisResult;
    try {
        result = JSON.parse(text) as AnalysisResult;
    } catch (parseError) {
        throw new SyntaxError("Failed to parse the cosmic data structure.");
    }

    result.language = language;

    if (inputs.includeImage && !isDecision) {
        try {
            const imagePrompt = `
                Artistic representation of ${result.animalPersona.animal}, 
                ethereal, glowing, high quality digital art.
                No text.
            `;
            
            const imageResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: imagePrompt }] },
                config: { imageConfig: { aspectRatio: "1:1" } }
            });

            for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData) {
                    result.generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        } catch (imgError) {
            console.error("Image generation failed:", imgError);
        }
    }

    return result;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "An unexpected error occurred.");
  }
};
