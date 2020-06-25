package bom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Employee {

	private int id;
	private String name;
	private int age;
	private String email;
	private int departmentid;
}
