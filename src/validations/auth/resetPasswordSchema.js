import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
    password: Yup.string().min(8).required(),
    confirm: Yup.string().oneOf([Yup.ref('password'), ''], 'password must matches').required()
});