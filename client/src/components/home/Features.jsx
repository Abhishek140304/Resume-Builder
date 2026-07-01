import React from 'react'
import { Zap, Eye, FileCheck, FileDown } from 'lucide-react'
import Title from './Title';

export default function Features() {
    const [isHover, setIsHover] = React.useState(false);

    return (
        <div id='features' className='flex flex-col items-center my-10 scroll-m-12'>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-6 py-1.5">
                <Zap width={14} />
                <span>Simple Process</span>
            </div>

            <Title title='Build your resume' discription='Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features' />

            <div className="flex flex-col md:flex-row items-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />

                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>

                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                            <Eye className="size-6 text-violet-600 shrink-0" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Real-Time Preview</h3>
                                <p className="text-sm text-slate-600 max-w-xs">See your resume update instantly as you type. No more guessing what the final layout will look like.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <FileCheck className="size-6 text-green-600 shrink-0" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">ATS-Friendly Templates</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Professionally designed layouts optimized to pass through company Applicant Tracking Systems with ease.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <FileDown className="size-6 text-orange-600 shrink-0" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Instant PDF Export</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Download your polished, job-ready resume in a high-resolution PDF format with a single click.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
    );
};