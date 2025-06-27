const fallbackAvatars = [
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Alpha",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Beta",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Charlie",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Delta",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Echo",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Foxtrot",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Gamma",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Nova",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Pixel",
    "https://api.dicebear.com/6.x/thumbs/svg?seed=Zebra"
];

const getAvatar = (user) => {
    if (user.avatar) return user.avatar;
    const hash = [...user.username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return fallbackAvatars[hash % fallbackAvatars.length];
};
export default getAvatar;