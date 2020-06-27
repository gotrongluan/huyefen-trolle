package services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class GenericService<E,B> {
	
	@PersistenceContext(name="demo")
	EntityManager em;
	
	public void setEm(EntityManager em) {
		this.em=em;
	}
	
	public EntityManager getEm() {
		return em;
	}
	
	public void save(E entity) {
		if (entity != null) {
			em.persist(entity);
		}
	}
	
	public void update(E entity) {
		em.merge(entity);
	}
	
	public void remove(E entity) {
		em.remove(entity);
	}
	
	public abstract E toEntity(B bom);

    public abstract B toBom(E entity);

    public List<E> toEntities(List<B> boms) {
        if (boms == null) {
            return null;
        }
        List<E> entities = new ArrayList<>();
        boms.stream().map((each) -> toEntity(each)).filter((entity) -> (entity != null)).forEach((entity) -> {
            entities.add(entity);
        });
        return entities;
    }

    public List<B> toBoms(List<E> entities) {
        if (entities == null) {
            return null;
        }
        List<B> boms = new ArrayList<>();
        entities.stream().map((each) -> toBom(each)).filter((bom) -> (bom != null)).forEach((bom) -> {
            boms.add(bom);
        });
        return boms;
    }

}
