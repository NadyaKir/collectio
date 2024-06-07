const JIRA_URL = process.env.JIRA_URL;
const JIRA_ADMIN_EMAIL = process.env.JIRA_ADMIN_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

const JIRA_AUTH = Buffer.from(`${JIRA_ADMIN_EMAIL}:${JIRA_API_TOKEN}`).toString(
  "base64"
);

const findJiraUser = async (email) => {
  try {
    const response = await fetch(
      `${JIRA_URL}/rest/api/3/user/search?query=${email}`,
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

const createJiraUser = async (email) => {
  try {
    const response = await fetch(`${JIRA_URL}/rest/api/3/user`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: email,
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

const getReporterAccountId = async (email) => {
  let reporterAccountId = null;

  try {
    const existingUserResponse = await findJiraUser(email);

    if (existingUserResponse.length > 0) {
      reporterAccountId = existingUserResponse[0].accountId;
    } else {
      const createUserResponse = await createJiraUser(email);
      reporterAccountId = createUserResponse.accountId;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  return reporterAccountId;
};

export const createJiraIssue = async (req, res) => {
  try {
    const email = req.body.email;

    const reporterAccountId = await getReporterAccountId(email);
    const assigneeAccountId = "6318aec5b433b060db5729b6";

    const response = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          summary: req.body.description,
          description: {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: req.body.description,
                  },
                ],
              },
            ],
          },
          customfield_10063: req.body.collectionTitle,
          customfield_10062: req.body.currentUrl,
          customfield_10064: { id: "", name: req.body.priority },
          project: {
            key: JIRA_PROJECT_KEY,
          },
          issuetype: {
            name: "Task",
          },
          assignee: {
            id: assigneeAccountId,
          },
          reporter: {
            id: reporterAccountId,
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

export const getIssuesByUserAndProject = async (req, res) => {
  const email = req.query.email;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 7;
  const search = req.query.search;
  const status = req.query.status;

  const reporterAccountId = await getReporterAccountId(email);

  try {
    let jqlQuery = `${JIRA_URL}/rest/api/3/search?jql=project=${JIRA_PROJECT_KEY} AND reporter=${reporterAccountId}`;

    if (search) {
      jqlQuery += ` AND summary~"${search}"`;
    }

    if (status) {
      jqlQuery += ` AND status="${status}"`;
    }

    jqlQuery += `&startAt=${(page - 1) * pageSize}&maxResults=${pageSize}`;

    const response = await fetch(jqlQuery, {
      method: "GET",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getProjectStatuses = async (_, res) => {
  try {
    const response = await fetch(`${JIRA_URL}/rest/api/3/status`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${JIRA_AUTH}`,
        Accept: "application/json",
      },
    });

    const responseData = await response.json();

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
