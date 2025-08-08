import mongoose from "mongoose";

const subscribeSchema2 = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
});

const SubscribeModel2 = mongoose.model("Subscribe2", subscribeSchema2);
export default SubscribeModel2;