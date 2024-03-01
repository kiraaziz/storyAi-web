import { NextResponse } from "next/server";

const options = (about) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Authorization': process.env.FIREWORKS_API_KEY,
        },
        body: JSON.stringify({
            model: "accounts/fireworks/models/mixtral-8x7b-instruct",
            stream: true,
            n: 1,
            messages: [
                { role: "system", content: "you are a story maker" },
                {
                    role: "user",
                    content: about
                }
            ],
            stop: [
                "<|im_start|>",
                "<|im_end|>",
                "<|endoftext|>"
            ],
            top_p: 1,
            top_k: 40,
            presence_penalty: 0,
            frequency_penalty: 0,
            context_length_exceeded_behavior: "truncate",
            temperature: 0.9,
            max_tokens: 4096
        }),
    }
}

const endpoint = "https://api.fireworks.ai/inference/v1/chat/completions"

export const POST = async (req) => {

    const body = await req.json()

    const story = {
        about: body.about,
        count: body.count,
        genre: body.selectedGenres.length > 0 && `with this genres ${body.selectedGenres.join(" , ")}`
    }

    console.log(`Compose a story centered about ${story.about} , encompassing ${story.count} scenes ${story.genre} that align with the provided TypeScript interface "StoryRequest." Maintain a strict adherence to the JSON data format in your response.`)

    const reqData = await fetch(endpoint, options(`Compose a story centered about ${story.about} , encompassing ${story.count} scenes ${story.genre} that align with the provided TypeScript interface "StoryRequest." Maintain a strict adherence to the JSON data format in your response. 
    interface StoryRequest {
      // Overall topic of the story
      topic: string;
    
      // Details about the main story
      story: {
        // Title of the story
        title: string;
    
        // Description of the story
        description: string;

        // long prompt for image generation related to the story with many details
        prompt: string;
    
        // List of scenes in the story
      scenes: {
          // Title of the scene
          script: string;
    
          // Content or script for the scene
          content: string;
    
          // long prompt for image generation related to the scene with many details
          prompt: string;
        }[];
      };
    }`))
    const data = await reqData.text()

    const res = data.split("data: ").map((val) => {
        try {
            return JSON.parse(val)
        } catch (e) {
            return
        }
    }).filter((val) => {
        return val
    }).map((val) => {
        try {
            return val.choices[0].delta.content
        } catch (e) {
            return
        }
    }).join("")

    const result = res.includes("```") ? res.split('```')[1].replace(/^[^\s]+/, '') : res


    return NextResponse.json(JSON.parse(result))
}