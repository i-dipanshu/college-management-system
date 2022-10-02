import Registration_Id from "../models/Registration_Id";

import handleAsyncError from "../middlewares/asyncErrorHandler";

export const createNewRegistration_ID = handleAsyncError( async (req, res, next) => {
    
    const Id = Registration_Id.findOne(req.body.Reg_Id);

    if(!Id){

    }
})