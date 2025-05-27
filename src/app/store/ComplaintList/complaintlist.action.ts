import { createAction, props } from '@ngrx/store';
import { Reclamation } from 'src/app/shared/classes/entities/reclamation';

// Fetch
export const fetchComplaintListData = createAction('[Data] Fetch Complaint List');
export const fetchComplaintListSuccess = createAction('[Data] Fetch Complaint List Success', props<{ complaintListData: Reclamation[] }>());
export const fetchComplaintListFail = createAction('[Data] Fetch Complaint List Failed', props<{ error: string }>());

// Add Data
export const addComplaintList = createAction(
    '[Data] Add Complaint',
    props<{ newData: Reclamation }>()
);
export const addComplaintListSuccess = createAction(
    '[Data] Add Complaint Success',
    props<{ newData: Reclamation }>()
);
export const addComplaintListFailure = createAction(
    '[Data] Add Complaint Failure',
    props<{ error: string }>()
);

// Update Data
export const updateComplaintList = createAction(
    '[Data] Update Complaint',
    props<{ updatedData: Reclamation }>()
);
export const updateComplaintListSuccess = createAction(
    '[Data] Update Complaint Success',
    props<{ updatedData: Reclamation }>()
);
export const updateComplaintListFailure = createAction(
    '[Data] Update Complaint Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteComplaintList = createAction(
    '[Data] Delete Complaint',
    props<{ id: string }>()
);
export const deleteComplaintListSuccess = createAction(
    '[Data] Delete Complaint Success',
    props<{ id: string }>()
);
export const deleteComplaintListFailure = createAction(
    '[Data] Delete Complaint Failure',
    props<{ error: string }>()
);