import Image from "next/image";


export default function JobCardBase(props){
    return (
        <div className="bg-white rounded-[6px] px-8 py-8 cursor-pointer max-w-md relative mt-8">
            <Image className="absolute top-[-1.5rem]" src={props.data.logo} width={50} height={50}/>
            <div className="flex text-darkGrey font-base mt-4">
                <p className="">{props.data.postedAt}</p>
                <div className="rounded-full bg-darkGrey h-[4px] w-[4px] mx-4 my-auto"/>
                <p>{props.data.contract}</p>
            </div>
            <p className="text-xl hover:text-darkGrey font-bold mt-4">{props.data.position}</p>
            <p className="text-base text-darkGrey mt-4">{props.data.company}</p>
            <p className="text-sm text-lightBlue font-bold mt-6">{props.data.location}</p>
        </div>
    )
}