import { types } from "../R_types/types";

//*********************************//
export const setError = (err)=>({

    type:types.iuSetError,
    payload:err
});

export const removeError = ()=>({

    type:types.iuRemoveError,
});


//*********************************//
export const startLoading  = ()=>({

    type:types.uiStartLoading
})
export const finishLoading = ()=>({

    type: types.uiFinishLoading
})



//si pones 
//types :types.iuRemoveError,
//error
//Uncaught Error: Actions may not have an undefined "type" property. Have you misspelled a constant?
//debe ser
//type :types.iuRemoveError,
