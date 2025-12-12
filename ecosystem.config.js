module.exports = {
    apps: [
        {
            name: 'uvo-app',
            script: 'npm',
            args: 'start',
            cwd: '/home/cloudpanel/htdocs/uvo-amsterdam.dev',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
