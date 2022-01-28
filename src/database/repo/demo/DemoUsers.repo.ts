import { IDemoUser } from '../../../shared/types/demo/IDemoUser';
import { InternalServerError } from '../../../shared/types/errors/InternalServer.error';
import { DemoUserModel } from '../../model/demo/DemoUsers.model';

export default class DemoUsersRepo {
  
  static async saveUser(newUser: IDemoUser): Promise<IDemoUser> {

    const userModel = new DemoUserModel(newUser);

    try { 
      return await userModel.save();
    } catch(_) {
      throw new InternalServerError('could not save user');
    }
  }

  static async getUser(user_id: string): Promise<IDemoUser> {
    return await DemoUserModel.findById(user_id).lean();
  }

  static async getUsers(): Promise<IDemoUser[]> {
    return await DemoUserModel.find({}).lean();
  }

  static async getMatchingUsers(ids: string[]): Promise<IDemoUser[]> {
    const users = await DemoUsersRepo.getUsers();
    return users.filter(user => !!ids.filter(id => id === user._id));
  }

  static async isRunningForUser(user_id: string) {
    const user = await DemoUsersRepo.getUser(user_id);
    return user.isRunning;
  }

  static async setRunningForUser(user_id: string, isRunning: boolean) {
    return await DemoUserModel.updateOne({ _id: user_id }, { isRunning: isRunning }).lean();
  }

  static async setExpirationTime(user_id: string, expiration_time: Date): Promise<IDemoUser> {
    return await DemoUserModel.updateOne({ _id: user_id }, { expiration_time: expiration_time }).lean();
  }

}