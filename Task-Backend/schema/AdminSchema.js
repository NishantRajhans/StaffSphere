import mongoose from 'mongoose';
const AdminSchema = new mongoose.Schema({
  AdminFirstName: {
    type: String,
    required: true,
  },
  AdminLastName: {
    type: String,
    required: true,
  },
  AdminEmail: {
    type: String,
    required: true,
    trim: true,
  },
  AdminPassword: {
    type: String,
    required: true,
  },
});
const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
