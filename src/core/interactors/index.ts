import UserDataSource from '../../dataSources/UserDataSource';
import UserInteractor from './userInteractor';
import DrugDataSource from '../../dataSources/DrugDataSource';
import DrugInteractor from './drugInteractor';
import VaccinationDataSource from '../../dataSources/VaccinationDataSource';
import VaccinationInteractor from './vaccinationInteractor';

const userDataSource = new UserDataSource();
export const userInteractor = new UserInteractor(userDataSource);

const drugDataSource = new DrugDataSource();
export const drugInteractor = new DrugInteractor(drugDataSource);

const vaccinationDataSource = new VaccinationDataSource();
export const vaccinationInteractor = new VaccinationInteractor(vaccinationDataSource);


