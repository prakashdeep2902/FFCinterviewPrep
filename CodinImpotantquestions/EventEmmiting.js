import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

const sendEmail = (user) => {
  console.log(`Sending email to ${user.email}`);
};

const errorHandler = () => {
  console.error(`name and email are required`);
};

emitter.on("login", sendEmail);
emitter.on("ErorrMsg", errorHandler);

function login(user) {
  if (!user.name || !user.email) {
    emitter.emit("ErorrMsg");
    return;
  }

  console.log(`${user.name} logged in`);
  emitter.emit("login", user);
}

login({
  name: "",
  email: "john@.com",
});

// Remove listeners
emitter.off("login", sendEmail);
emitter.off("ErorrMsg", errorHandler);
