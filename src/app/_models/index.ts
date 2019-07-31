export class Give {
    _id: string;
    title: string;
    type: string;
    createdDate: Date;
    // location: TODO add geonJson
    description: string;
    status: string;
    user: User;
    givedTo: string;
    picture1: string;
    picture2: string;
    picture3: string;
}

export class User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    phone: number;
    address: string;
    messages: Array<Message>;
    wishGives: Array<Give>;
}

export class Message {
    _id: string;
    text: string;
    createdDate: Date;
    users: Array<User>;
}
