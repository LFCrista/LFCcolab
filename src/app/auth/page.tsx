"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AdminLoginForm from "./components/admin-login-form";
import UserLoginForm from "./components/user-login-form";

const AuthPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="colab">Colaboradores</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
        </TabsList>
        <TabsContent value="colab">
          <UserLoginForm />
        </TabsContent>
        <TabsContent value="admin">
          <AdminLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
