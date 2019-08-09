export class Give {
    _id: string;
    title: string;
    type: string;
    createdDate: Date;
    // location: TODO add geonJson
    description: string;
    status: string;
    user: string;
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
    email: string;
    token?: string;
    phone: number;
    address: string;
    messages: Array<Message>;
    wishGives: Array<Give>;
    type: string;
}

export class Message {
    _id: string;
    text: string;
    createdDate: Date;
    sender: string;
    receiver: string;
}

export class UserMessage extends User {
    newMessage: number;
    constructor(user: User) {
        super();
        this._id = user._id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.newMessage = null;
    }
}
