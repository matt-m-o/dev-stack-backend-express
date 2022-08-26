import { Request, Response, NextFunction } from "express";

import Joi from 'joi';

interface RequestSchema {
    body?: Joi.ObjectSchema<any>;
    params?: Joi.ObjectSchema<any>;
}


export function validateRequest(schema: RequestSchema) {
    return(req: Request, res: Response, next: NextFunction) => {

        let error_details: any = null;

        if (schema?.body) {
            const result = schema.body.validate(req.body);
    
            if(result.error)
                error_details = result.error.details[0];
            else
                req.body = result.value;
        }
    
        if (schema?.params) {        
            const result = schema.params.validate(req.params); // joi version 17.6.0
    
            if(result.error)
                error_details = result.error.details[0];                            
            else
                req.params = result.value;                  
        }

        if (error_details) {
            return res.status(400).json({
                error: error_details
            })
        }

        next();
    }    
}