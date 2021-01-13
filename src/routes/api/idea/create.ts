import type { ServerResponse } from "http"

import { UDFRunner } from "../../_queries"

export const post = async (req: any, res: ServerResponse) => {
    const { idea, description, author, stars = 0, views = 0 } = req.body
    if(idea && description && author){
        try{
            await UDFRunner('CreateIdea', idea, description, author, stars, views)
            res.end(JSON.stringify({
                message: `Idea created!`,
                success: true
            }))
        }
        catch{
            res.statusCode = 500
            res.end(JSON.stringify({
                message: `Something weird happened when trying to create the idea. Try again later`,
                success: false
            }))
        }
    }
    else{
        res.statusCode = 400
        res.end(JSON.stringify({
            message: `You need to define idea, and description when creating an idea`,
            success: false
        }))
    }
}