package services;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.NoResultException;

import bom.Department;
import entites.DepartmentEntity;

@Stateless
public class DepartmentService extends GenericService<DepartmentEntity, Department> {
	public DepartmentService() {
		super();
	}

	public DepartmentEntity findDepartmentById(int deptId) {
		List<DepartmentEntity> getOneDepartment = em
				.createQuery("SELECT d FROM DepartmentEntity d where d.id = :deptid", DepartmentEntity.class)
				.setParameter("deptid", deptId).getResultList();

		if (getOneDepartment.isEmpty())
			throw new NoResultException("No source found");
		else
			return getOneDepartment.get(0);

	}

	@Override
	public DepartmentEntity toEntity(Department bom) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Department toBom(DepartmentEntity entity) {
		// TODO Auto-generated method stub
		return null;
	}
}
