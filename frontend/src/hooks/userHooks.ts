import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UserInfo } from "../types/Userinfo";
import apiClient from "../apiClient";

type MutationData = {
    email: string;
    password: string;
};

export const useSigninMutation = (): UseMutationResult<UserInfo, Error, MutationData, unknown> => {
    return useMutation({
        mutationFn: async ({ email, password }: MutationData) => {
            const response = await apiClient.post<UserInfo>(`api/users/signin`, {
                email,
                password,
            });
            return response.data;
        },
    });
};


export const useSignupMutation = () =>

useMutation({
    mutationFn: async ({
        name,
        email, 
        password,
    } : {
        name: string
        email: string
        password: string
    }) =>
    (
        await apiClient.post<UserInfo>(`api/users/signup`, {
            name,
            email,
            password,
        })
    ).data,
})
