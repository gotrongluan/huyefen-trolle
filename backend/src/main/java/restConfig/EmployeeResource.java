package restConfig;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import bom.Employee;
import entites.EmployeeEntity;
import services.EmployeeService;

@Stateless
@Path("employee")
public class EmployeeResource {
	
	@EJB
	EmployeeService empService;
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public List<Employee> showAll(){
		return empService.toBoms(empService.showAll());
	}
	
	@GET
	@Path("{EmployeeId}")
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Employee read(@PathParam("EmployeeId") int id) {
		return empService.toBom(empService.findById(id));
	}
	//changes here
	@POST
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Response addEmployee(Employee emp) {
		EmployeeEntity empEntity = empService.toEntity(emp);
		empService.addEmployee(empEntity);
		return Response.status(Status.OK).build();
	}
	
	@PUT
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Response updateEmployee(Employee emp) {
		EmployeeEntity empEntity = empService.toEntity(emp);
		empService.updateEmployee(empEntity);
		return Response.status(Status.OK).build();
	}
	
	@DELETE
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Response deleteEmployee(Employee emp) {
		EmployeeEntity empEntity = empService.toEntity(emp);
		empService.deleteEmployee(empEntity);
		return Response.status(Status.OK).build();
	}
	
	@DELETE
	@Path("{EmployeeId}")
	@Produces({MediaType.APPLICATION_JSON})
	@Consumes({MediaType.APPLICATION_JSON})
	public Response deleteEmployeebyId(@PathParam("EmployeeId") int id) {
		empService.deleteEmployeebyId(id);
		return Response.status(Status.OK).build();
	}
	

}
