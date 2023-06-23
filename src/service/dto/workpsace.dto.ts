import { ApiModelProperty } from '@nestjs/swagger';
import { ProjectDTO } from './project.dto';
import { BaseDTO } from './base.dto';
import { UserDTO } from './user.dto';
import { TaskDTO } from './task.dto';

/**
 * An Project DTO object.
 */
export class WorkspaceDTO extends BaseDTO {

    @ApiModelProperty({ example: 'MyProject', description: 'Project name', required: true })
    name: string;

    // @ApiModelProperty({
    //     isArray: true,
    //     type: UserDTO,
    //     description: 'List members', required: false
    // })
    // host?: UserDTO[];

    @ApiModelProperty({
        isArray: true,
        type: UserDTO,
        description: 'List members', required: false
    })
    members?: UserDTO[];

    @ApiModelProperty({
        isArray: true,
        type: TaskDTO,
        description: 'List projects', required: false
    })
    projects?: ProjectDTO[];

}
