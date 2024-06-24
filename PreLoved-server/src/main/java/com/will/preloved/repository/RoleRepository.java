package com.will.preloved.repository;

import com.will.preloved.enums.RoleName;
import com.will.preloved.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
