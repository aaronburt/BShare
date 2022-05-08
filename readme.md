# BShare V5 

BShare uses SFTP to upload to a remote storage box that can be redirected to for ShareX content delivery. 
It will use an Atlas cloud database to catalog each upload and verify the authenticity of each user.

This code requires a ```.env``` file with the following variables. 

```text
logging=false
express_port=
atlas_username=
atlas_password=
atlas_database=
atlas_collection=
atlas_cluster=
sftp_host=
sftp_port=
sftp_username=
sftp_password=
sftp_directory=
```

## TODO list

- [x] User authentication for read/write
- [ ] User login
- [ ] Upload metadata added to database
- [ ] Clean web ui