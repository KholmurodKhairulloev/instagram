import { Button } from '@/shared/ui/button'
import InfoFollowers from '@/shared/ui/infoFollowers'
import InfoProfile from '@/shared/ui/infoProfile'
import { MoreHorizontal, SettingsIcon, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { ProfileSettingsModal } from './profile-settings-modal'
import ProfileEditModal from './profile-edit-modal'
import { UnfollowDialog } from './unfollow-modal'

const HeaderSectionProfile = ({
	userName,
	posts,
	followers,
	following,
	firstName,
	about,
	routId,
}: {
	userName: string
	posts: string
	followers: string
	following: string
	firstName: string
	about: string
	routId: string | undefined
}) => {
	const [openS, setOpenS] = useState<boolean>(false)
	const [openE, setOpenE] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>(false)
	const [isFollow, setIsFollow] = useState<boolean>(true)

	return (
		<div>
			<aside className='flex flex-col gap-[20px]'>
				<div className='flex gap-[20px] items-start lg:items-center flex-col lg:flex-row'>
					<p className='text-[#fff] text-[25px]'>{userName}</p>
					{routId ? (
						<div className='flex gap-[20px] items-center'>
							<Button
								onClick={() => setIsFollow(!isFollow)}
								className={`px-[30px] py-[5px] ${
									isFollow ? 'bg-blue-500' : 'bg-[#313131]'
								} text-[#fff] rounded-md cursor-pointer`}
							>
								{isFollow ? 'Subscribe' : 'Unsubscribe'}
							</Button>
							<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
								Send Message
							</Button>
							<Button
								onClick={() => setOpenE(true)}
								className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'
							>
								<UserPlus className='text-[#fff]' size={25} />
							</Button>
							<MoreHorizontal size={25} />
						</div>
					) : (
						<div className='flex gap-[10px] items-center'>
							<Button
								onClick={() => setOpenE(true)}
								className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'
							>
								Edit Profile
							</Button>
							<Button className='px-[20px] py-[5px] bg-[#3b3b3b] text-[#fff] rounded-md cursor-pointer'>
								View archive
							</Button>
							<SettingsIcon
								onClick={() => setOpenS(true)}
								className='text-[#fff] lg:block hidden cursor-pointer'
								size={32}
							/>
						</div>
					)}
				</div>
				<div className='hidden lg:block'>
					<InfoFollowers
						posts={posts}
						followers={followers}
						following={following}
						routId={routId}
					/>
				</div>
				<div className='hidden lg:block'>
					<InfoProfile firstName={firstName} about={about} />
				</div>
			</aside>
			<ProfileSettingsModal open={openS} setOpen={setOpenS} />
			<ProfileEditModal openE={openE} setOpenE={setOpenE} />
			<UnfollowDialog
				open={open}
				setOpen={setOpen}
				username={userName}
				userId={routId}
				avatarUrl={''}
			/>
		</div>
	)
}

export default HeaderSectionProfile
