const JIRA_URL = process.env.JIRA_URL;
const JIRA_ADMIN_EMAIL = process.env.JIRA_ADMIN_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const JIRA_AUTH = Buffer.from(`${JIRA_ADMIN_EMAIL}:${JIRA_API_TOKEN}`).toString(
  "base64"
);

const findJiraUser = async (req, res) => {
  try {
    const response = await fetch(
      `${JIRA_URL}/rest/api/3/user/search?query=${req.body.email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${JIRA_AUTH}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`Response: ${response.status} ${response.statusText}`);

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createJiraUser = async (req, res) => {
  try {
    const response = await fetch(`${JIRA_URL}/rest/api/3/user`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: req.body.email,
        products: ["jira-servicedesk", "jira-software"],
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`Response: ${response.status} ${response.statusText}`);

    return responseData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createJiraIssue = async (req, res) => {
  try {
    const existingUserResponse = await findJiraUser(req, res);

    let assigneeAccountId;

    if (existingUserResponse.length > 0) {
      assigneeAccountId = existingUserResponse[0].accountId;
    } else {
      const createUserResponse = await createJiraUser(req, res);
      assigneeAccountId = createUserResponse.accountId;
    }

    const response = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          summary: "HELLO API",
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "Order entry fails when selecting supplier.",
                  },
                ],
              },
            ],
          },
          project: {
            key: JIRA_PROJECT_KEY,
          },
          issuetype: {
            name: "Task",
          },
          reporter: {
            id: assigneeAccountId,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log(`Response: ${response.status} ${response.statusText}`);

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
