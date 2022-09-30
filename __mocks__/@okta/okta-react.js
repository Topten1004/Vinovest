const oktaAuth = require("@okta/okta-react");
const oktaMock = jest.createMockFromModule("@okta/okta-react");

oktaMock.useOktaMock = () => ({
    oktaAuth: {
        getUser: () => "stub-user",
    },
});

return oktaMock;
