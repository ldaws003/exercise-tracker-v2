'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signIn } from "next-auth/react";
const UserForm = () => {
     const session = useSession();
     const onSubmit = () => {
       if (session.status !== "authenticated") {
         signIn(); // will re-direct to sign in page
       } else {
         // do something else
        }
  return (
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Your name"/>
        <button type="submit" />
      </form>
  )
  };
}