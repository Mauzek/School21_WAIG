type User = {
    id: string;
    username: string;
    birthday: Date | string;
    description: string;
    email: string;
    firstname: string;
    lastname: string;
    patronymic: string;
    gender: string;
    isAdmin: boolean;
    profileImageId: string;
    tgName: string;
    age?: number;
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
    name: string;
    color: string;
};

export type { User, Group, Interests };
