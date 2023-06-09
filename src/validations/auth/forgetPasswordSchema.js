import * as Yup from 'yup';

export const forgetPasswordSchema = Yup.object({
    email: Yup.string().email().required()
});