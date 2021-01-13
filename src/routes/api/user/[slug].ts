// import type { Expr } from "faunadb"
// import {  } from 'faunadb'
import type { ServerResponse } from "http"
import type { Request } from "polka"
import { UDFRunner } from "../../_queries"

export const get = async (req: Request, res: ServerResponse) => {
    const { slug } = req.params
    try {
        const ref: any = await UDFRunner('UserRef', slug)
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            id: ref.id
        }))
    }
    catch(err){
        // console.error(err)
        res.statusCode = 404
        res.end(JSON.stringify({
            message: `User ${slug} not found`
        }))
    }
}