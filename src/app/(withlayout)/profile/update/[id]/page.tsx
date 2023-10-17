import ProfileEditForm from "@/components/forms/ProfileEditForm";

const ProfileUpdatePage = ({params}: {params: any}) => {
    const {id} = params;
    return (
        <ProfileEditForm id={id} />
    );
};

export default ProfileUpdatePage;