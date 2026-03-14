import { useGetSibscribesQuery, useGetSubscriptionQuery } from '@/app/store/profileSlice/profileSlice'
import SubscribersModal from '@/widgets/Subscrbers-modal'
import SubscriptionModal from '@/widgets/subscription-modal'
import { useState } from 'react'

const InfoFollowers = ({
	posts,
	followers,
	following,
	routId
}: {
	posts: string
	followers: string
	following: string
	routId : string | undefined
}) => {
	const [openSC, setOpenSC] = useState<boolean>(false)
	const [open,setOpen] = useState<boolean>(false)
	const token = localStorage.getItem('decodeToken')
	const decodeToken = token ? JSON.parse(token) : {}
	const {data : subscribersData,error,isLoading} = useGetSibscribesQuery(routId ? routId : decodeToken.sid)
	const {data} = useGetSubscriptionQuery(routId ? routId : decodeToken.sid)
	if(error) return <p>error</p>
	if(isLoading) return <p>Loading...</p>
	
	return (
		<div>
			<div className='flex lg:gap-[70px] w-full mb-[10px] justify-around m-auto  items-center '>
				<p className='text-[gray] flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{posts?.length ? posts : 0} </span>posts
				</p>
				<p
					onClick={() => setOpenSC(true)}
					className='text-[gray] cursor-pointer flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'
				>
					<span className='text-[#fff]'>{followers?.length ? followers : 0} </span>followers
				</p>
				<p onClick={() => setOpen(true)} className='text-[gray] cursor-pointer flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{following?.length ? following : 0} </span>following
				</p>
			</div>
			<SubscribersModal open={openSC} subscribers={subscribersData?.data} setOpen={setOpenSC} />
			<SubscriptionModal open={open} setOpen={setOpen} subscribers={data?.data}/>
		</div>
	)
}

export default InfoFollowers
