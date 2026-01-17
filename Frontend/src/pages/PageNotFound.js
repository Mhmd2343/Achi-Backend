import React from 'react'
import SEO from '../components/SEO'

const PageNotFound = () => {
    return (
        <>
            <SEO
                title="404 Page Not Found | ACHI Scaffolding"
                description="The page you are looking for could not be found."
                robots="noindex,follow"
                noindex={true}
            />
            <div>
                <h1 className="h-[100vh] flex justify-center items-center uppercase font-sairaStencil text-[#28509e] text-[30px] leading-[36.4px] font-[400] 2xl:text-[60px] xl:text-[55px] lg:text-[45px] md:text-[45px] sm:text-[30px] 2xl:leading-[65px] xl:leading-[65px] md:leading-[65px] text-center">
                    404 Page Not Found
                </h1>
            </div>
        </>
    )
}

export default PageNotFound