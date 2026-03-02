"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import Link from 'next/link';

const AuthButtons = () => {
    const session = useSession();
    return (
        <div>
            {
                session.status =="authenticated" ? (<>
                <button onClick={()=> signOut()} className="btn btn-ghost">logout</button>
                
                </> 
            ) : (
            <>
                <Link href={"/auth/login"} className="btn btn-ghost">Login</Link>  
            </>
            )}
           
        </div>
    );
};

export default AuthButtons;