const filterFn = value => value.trim();

module.exports = [
    {
        type: String,
        name: 'domain',
        message: 'Enter the domain name for the vhost: ',
        filter: filterFn,
    },
    {
        type: String,
        name: 'documentRoot',
        message: 'Enter the absolute path for vhost document root: ',
        filter: filterFn,
    },
    {
        type: String,
        name: 'fileName',
        message: 'Name to assign to this vhost conf file: ',
        filter: filterFn,
    },
];