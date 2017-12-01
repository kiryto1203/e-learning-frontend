class user{
  constructor(username= ""
             ,password=""
             ,activation_digest=""
             ,activated_at= main.now
             ,remember_digest=""
             ,reset_digest=""
             ,reset_sent_at= main.now
             ,display_name=""
             ,activated=false
             ,email=""
             ,phone=""
             ,address=""
             ,avatar=""
             ,role=""
             ,created_at=main.now
             ,updated_at=main.now){
    this.username = username,
    this.password = password,
    this.activated_at = activated_at,
    this.remember_digest = remember_digest,
    this.reset_digest = reset_digest,
    this.reset_sent_at = reset_sent_at,
    this.display_name = display_name,
    this.activated = activated,
    this.email = email,
    this.phone = phone,
    this.address = address,
    this.avatar = avatar,
    this.role = role,
    this.created_at = created_at,
    this.updated_at = updated_at
  }
}

$(document).ready(function () {
  // main.setRole();
})
