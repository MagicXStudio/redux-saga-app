import { Avatar, Upload, Form } from "antd"
import { Contact } from "../../models/Contact";


const ContactForm = (item: Contact) => {
    return (<Form>
        <Avatar />
        <Upload />
    </Form>);
}

export default ContactForm;