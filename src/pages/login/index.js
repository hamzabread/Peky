import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Header from '@/components/Landing/Header/Header'

const index = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            setEmail(userEmail);
        }
        console.log('User email from localStorage:', userEmail);
        console.log('Current email state:', email);
    }, []);

    const login = async () => {
            const items = {
                email, 
                password, 
            };

            console.log(items);
    
            try{
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items),
            })
    
            const result = await response.json();
    
            if(!response.ok) {
                console.error("login Failed: ", result.error)
                return;
            }
    
            console.log("Successful", result);
            localStorage.setItem("user-info", JSON.stringify(result));
            localStorage.setItem("userEmail", email);
            navigate('/');
    
            
            } catch(error) {
                console.error("Network or parsing error:", error)
            }
    }


    return (
        <>
            <Header />
            <div className='pt-[100px] flex flex-col justify-center items-center '>
                <div className="bg-white flex flex-col justify-center items-center  rounded-[5px] shadow-lg w-[400px]">

                    <h3 className='bg-black w-[100%] text-white text-center p-[20px] text-[20px] rounded-t-[5px]'>Login</h3>

                    <div className="input__parent w-full !mt-[20px] pl-[20px] pr-[20px]">
                        <div className="!mb-[10px]">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none "
                                    placeholder=" "
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                                >
                                    Enter your email address*
                                </label>
                            </div>

                        </div>

                        <div className="option-field">
                            <div className="relative w-full">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 bg-[#f3f3f3] text-black text-sm rounded-[10px] outline-none border-none focus:outline-none "
                                    placeholder=" "
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666] text-xs transition-all duration-200 ease-in-out peer-focus:top-2 peer-focus:text-xs peer-focus:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:-translate-y-0"
                                >
                                    Enter your password*
                                </label>
                            </div>

                        </div>
                    </div>
                    <Link href='/forgot' className="text-[12px] text-red-500 text-right w-full pt-[10px] pr-[20px]">Forgot Password?</Link>
                    <div className='flex items-center gap-[10px] w-full p-[20px]'>
                        <button onClick={()=>login()} className="bg-black text-white w-full p-[15px] rounded-[5px]  transition duration-300 ease-in-out">
                            Login
                        </button>
                        <button className="bg-white text-black w-full p-[15px] rounded-[5px] border-[1px] border-black transition duration-300 ease-in-out">
                            Continue as Guest
                        </button>
                    </div>

                    <div className="flex-col flex items-center text-[#666] text-[14px] pb-[20px]">
                        <h6 className="flex gap-[5px]">Or sign in with
                            <button className="inline">
                                <img src="/assets/signup/Google.svg" alt="" />
                                <p className="google__p">Google</p>
                            </button>
                        </h6>


                        <p className="accountp">
                            Dont have an account? <Link href='/signup'>Sign Up</Link>
                        </p>
                    </div>
                </div>

            </div>

        </>
    )
}

export default index