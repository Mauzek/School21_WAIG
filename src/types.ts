type User = {
    id: number;
    username: string;
    birthday: Date | string;
    description: string;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    gender: string;
    isAdmin: boolean;
    profileImageId: string;
    tgName: string;
};


type Group = {
    id: number;
    creatorId: number;
    name: string;
    chars: string;
    color: string;
    description: string;
    membersCount: number;
    tags: Interests[]
};

type Interests = {
    id: number;
    name: string;
    color: string;
};

export type { User, Group };
